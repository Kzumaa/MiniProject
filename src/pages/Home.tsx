import Header from '@/components/base/Header'

export default function Home() {
  return (
    <div>
      <Header title="Home" />
      <div className="mt-4 grid gap-4">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4">
          <p>Welcome! This is the base skeleton with Tailwind, React Router and an API layer.</p>
        </div>
      </div>
    </div>
  )
}
