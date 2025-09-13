import Header from '@/components/base/Header'

export default function MentorPage() {
  return (
    <div>
      <Header title="Mentor Workspace" />
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4 mt-4">
        <p>Only users with role <b>mentor</b> can see this.</p>
      </div>
    </div>
  )
}
