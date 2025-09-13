import { ReactNode } from 'react'

export default function Header({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <header className="bg-white border-b">
      <div className="mx-auto container-narrow px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </header>
  )
}
