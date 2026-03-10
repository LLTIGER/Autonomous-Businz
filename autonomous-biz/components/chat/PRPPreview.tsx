'use client'

import { useState } from 'react'

interface PRP {
  id: string
  title: string
  content: string
}

interface PRPPreviewProps {
  prp: PRP
  onApprove: () => void
  onEdit: () => void
  onCancel: () => void
}

export function PRPPreview({ prp, onApprove, onEdit, onCancel }: PRPPreviewProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="my-2 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{'\u{1F4DD}'}</span>
          <span className="font-semibold text-gray-800">{prp.title}</span>
          <span className="text-xs px-2 py-0.5 bg-brand-100 text-brand-600 rounded-full">PRP</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {expanded && (
        <>
          <div className="px-4 py-3 max-h-96 overflow-y-auto">
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
              {prp.content}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
            <button
              onClick={onApprove}
              className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Approve
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}
