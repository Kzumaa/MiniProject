import { FormEvent, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '@/components/base/Header'
import Form from '@/components/shared/Form'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as any

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try {
      await login({ email, password })
      const to = location?.state?.from?.pathname ?? '/'
      navigate(to, { replace: true })
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Login failed')
    }
  }

  return (
    <div>
      <Header title="Login" />
      <div className="mt-4 max-w-md">
        {error && <div className="mb-3 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}
        <Form onSubmit={onSubmit} submitText="Sign in">
          <label className="block">
            <div className="text-sm font-medium mb-1">Email</div>
            <input className="w-full rounded-xl border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <div className="text-sm font-medium mb-1">Password</div>
            <input type="password" className="w-full rounded-xl border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </Form>
        <div className="text-xs text-gray-500 mt-3">Hook this form to your backend at <code>/auth/login</code>.</div>
      </div>
    </div>
  )
}
