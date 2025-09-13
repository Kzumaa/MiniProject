export default function NotAuthorized() {
  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6">
      <h2 className="text-xl font-semibold mb-2">Not authorized</h2>
      <p className="text-gray-600">You don't have permission to access this page.</p>
    </div>
  )
}
