import Header from '@/components/base/Header'

export default function About() {
  return (
    <div>
      <Header title="About" />
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4 mt-4">
        <p>This page exists to show simple routing and layout.</p>
      </div>
    </div>
  )
}
