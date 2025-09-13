import { FormEvent, ReactNode } from 'react'

export default function Form({
  children,
  onSubmit,
  submitText = 'Submit',
}: {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  submitText?: string
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4 space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
      <div className="pt-2">
        <button type="submit" className="px-3 py-2 rounded-xl bg-gray-900 text-white">
          {submitText}
        </button>
      </div>
    </form>
  )
}
