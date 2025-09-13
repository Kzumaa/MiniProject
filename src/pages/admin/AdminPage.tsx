import Header from '@/components/base/Header'

export default function AdminPage() {
  return (
    <div>
      <Header title="Admin Dashboard" />
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4 mt-4">
        <p>Only users with role <b>admin</b> can see this.</p>
      </div>
    </div>
  )
}
