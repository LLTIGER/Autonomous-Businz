'use client'

import { useTranslation } from '@/lib/i18n/context'

interface ApprovalGateProps {
  gate: string
  description: string
  onApprove: () => void
  onReject: () => void
}

export function ApprovalGate({ gate, description, onApprove, onReject }: ApprovalGateProps) {
  const t = useTranslation()

  return (
    <div className="my-3 border-2 border-yellow-400 rounded-xl bg-yellow-50 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-yellow-100 border-b border-yellow-200">
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-yellow-900 text-sm">{t.approval.title}</h4>
          <p className="text-yellow-800 text-xs font-medium">{gate}</p>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-sm text-yellow-900 mb-3">{description}</p>
        <p className="text-xs text-yellow-700 mb-4">
          <span className="font-medium">{t.approval.whatHappens}</span> {t.approval.description}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={onApprove}
            className="flex items-center gap-1.5 px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t.approval.approve}
          </button>
          <button
            onClick={onReject}
            className="flex items-center gap-1.5 px-5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t.approval.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}
