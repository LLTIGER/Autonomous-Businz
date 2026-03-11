'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect, useState } from 'react'
import { MessageBubble } from './MessageBubble'
import { OpportunityCard } from './OpportunityCard'
import { PRPPreview } from './PRPPreview'
import { ApprovalGate } from './ApprovalGate'
import { AgentRecommendation } from './AgentRecommendation'
import { useTranslation } from '@/lib/i18n/context'

export function ChatInterface() {
  const { messages, status, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const t = useTranslation()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSend = () => {
    if (!input.trim() || status === 'streaming' || status === 'submitted') return
    sendMessage({ text: input })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderToolPart = (
    part: { type: string; toolName?: string; toolCallId?: string; state?: string; input?: unknown; output?: unknown; errorText?: string },
    index: number
  ) => {
    const toolName = part.toolName ?? part.type.replace(/^tool-/, '')

    if (part.state !== 'output-available') {
      return (
        <div key={index} className="flex items-center gap-2 px-4 py-2 my-2 bg-brand-50 rounded-lg border border-brand-100">
          <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-brand-600 font-medium">
            {t.chat.running}{toolName}
          </span>
        </div>
      )
    }

    const result = part.output as Record<string, unknown>
    if (!result) return null

    if (Array.isArray(result) && result.length > 0 && result[0]?.title && result[0]?.source !== undefined) {
      return (
        <div key={index} className="space-y-3 my-2">
          {result.map((opp: Record<string, unknown>, i: number) => (
            <OpportunityCard
              key={i}
              opportunity={{
                id: (opp.id as string) || `opp-${i}`,
                title: opp.title as string,
                source: (opp.source as string) || 'marketplace',
                description: (opp.description as string) || '',
                category: (opp.category as string) || '',
                estimatedRevenue: (opp.estimatedRevenue as string) || (opp.estimated_revenue as string) || '',
                autonomyScore: (opp.autonomyScore as number) || (opp.autonomy_score as number) || 0,
                url: (opp.url as string) || '',
              }}
              onSelect={(id) => {
                setInput(`${t.chat.selectOpportunity}${id}`)
              }}
            />
          ))}
        </div>
      )
    }

    if (result.content && result.title && (result as Record<string, unknown>).template_used !== undefined) {
      return (
        <PRPPreview
          key={index}
          prp={{
            id: (result.id as string) || '',
            title: result.title as string,
            content: result.content as string,
          }}
          onApprove={() => setInput(`${t.chat.approvePRP}${result.id}`)}
          onEdit={() => setInput(`${t.chat.editPRP}${result.id}`)}
          onCancel={() => setInput(`${t.chat.cancelPRP}${result.id}`)}
        />
      )
    }

    if (result.url && result.status === 'deployed') {
      return (
        <div key={index} className="my-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-600 text-lg">{'\u2705'}</span>
            <span className="font-semibold text-green-800">{t.chat.deployedSuccessfully}</span>
          </div>
          <a
            href={result.url as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 underline hover:text-brand-600 text-sm"
          >
            {result.url as string}
          </a>
        </div>
      )
    }

    if (result.recommendedAgents && result.platform) {
      const r = result as {
        platform: { name: string; website: string; channels: string[] }
        recommendedAgents: { id: string; name: string; specialty: string; description: string; capabilities: string[]; autonomyScore: number }[]
        recommendedBrain: { tier: string; price: string; model: string; tokenBudget: string } | null
        totalMonthlyCost: string
      }
      return (
        <AgentRecommendation
          key={index}
          platform={r.platform}
          agents={r.recommendedAgents}
          brain={r.recommendedBrain}
          totalCost={r.totalMonthlyCost}
        />
      )
    }

    if (result.gate) {
      return (
        <ApprovalGate
          key={index}
          gate={result.gate as string}
          description={(result.description as string) || ''}
          onApprove={() => setInput(`${t.chat.approveGate}${result.gate}`)}
          onReject={() => setInput(`${t.chat.rejectGate}${result.gate}`)}
        />
      )
    }

    return (
      <div key={index} className="my-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-mono overflow-x-auto">
        <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
      </div>
    )
  }

  const isLoading = status === 'streaming' || status === 'submitted'

  const suggestions = [
    t.chat.suggestion1,
    t.chat.suggestion2,
    t.chat.suggestion3,
    t.chat.suggestion4,
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-6">
                <span className="text-3xl">{'\u{1F680}'}</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {t.chat.welcome}
              </h2>
              <p className="text-gray-500 max-w-md mb-8">
                {t.chat.welcomeDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion)
                      textareaRef.current?.focus()
                    }}
                    className="text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-brand-500 hover:bg-brand-50 transition-colors text-sm text-gray-600 hover:text-brand-600"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const textParts = message.parts
              .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
              .map((p) => p.text)
              .join('')

            const nonTextParts = message.parts.filter(
              (p) => p.type !== 'text'
            )

            return (
              <div key={message.id}>
                {textParts && (
                  <MessageBubble role={message.role as 'user' | 'assistant'} content={textParts} />
                )}
                {nonTextParts.map((part, i: number) =>
                  renderToolPart(part as { type: string; toolName?: string; toolCallId?: string; state?: string; input?: unknown; output?: unknown; errorText?: string }, i)
                )}
              </div>
            )
          })}

          {isLoading && messages.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-400">{t.chat.thinking}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chat.placeholder}
              rows={1}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label={t.chat.sendMessage}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          {status === 'streaming' ? t.chat.streaming : status === 'submitted' ? t.chat.processing : t.chat.inputHint}
        </p>
      </div>
    </div>
  )
}
