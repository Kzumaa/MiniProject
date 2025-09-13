export default function Footer() {
  return (
    <footer className="border-t mt-10 text-sm">
      <div className="mx-auto container-narrow px-4 py-6 text-gray-500">
        © {new Date().getFullYear()} React FE Base
      </div>
    </footer>
  )
}
