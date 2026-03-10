'use client'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

function formatContent(content: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const lines = content.split('\n')
  let inCodeBlock = false
  let codeContent = ''
  let codeLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        parts.push(
          <pre
            key={`code-${i}`}
            className="bg-gray-900 text-gray-100 rounded-lg p-4 my-2 overflow-x-auto text-sm font-mono"
          >
            {codeLanguage && (
              <div className="text-gray-500 text-xs mb-2">{codeLanguage}</div>
            )}
            <code>{codeContent.trim()}</code>
          </pre>
        )
        codeContent = ''
        codeLanguage = ''
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeContent += line + '\n'
      continue
    }

    // Process inline formatting
    const formattedLine = formatInline(line, i)
    parts.push(
      <span key={`line-${i}`}>
        {formattedLine}
        {i < lines.length - 1 && <br />}
      </span>
    )
  }

  return parts
}

function formatInline(text: string, keyPrefix: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // Match **bold**, `code`, and [text](url) patterns
  const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      // Bold
      nodes.push(
        <strong key={`b-${keyPrefix}-${match.index}`} className="font-semibold">
          {match[2]}
        </strong>
      )
    } else if (match[3]) {
      // Inline code
      nodes.push(
        <code
          key={`c-${keyPrefix}-${match.index}`}
          className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-brand-600"
        >
          {match[4]}
        </code>
      )
    } else if (match[5]) {
      // Link
      nodes.push(
        <a
          key={`a-${keyPrefix}-${match.index}`}
          href={match[7]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-500 underline hover:text-brand-600"
        >
          {match[6]}
        </a>
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-brand-500 text-white rounded-br-md'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
        }`}
      >
        <div className={`text-sm leading-relaxed ${isUser ? '' : 'prose prose-sm max-w-none'}`}>
          {formatContent(content)}
        </div>
      </div>
    </div>
  )
}
