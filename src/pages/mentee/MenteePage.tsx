import Header from '@/components/base/Header'

export default function MenteePage() {
  return (
    <div>
      <Header title="Mentee Area" />
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-4 mt-4">
        <p>Only users with role <b>mentee</b> can see this.</p>
      </div>
    </div>
  )
}
