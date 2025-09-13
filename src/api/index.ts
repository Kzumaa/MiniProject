import { HttpClient } from '@/api/http/HttpClient'
import { UserApi } from '@/api/resources/UserApi'
import { SubjectApi } from '@/api/resources/SubjectApi'
import { AuthApi } from '@/api/resources/AuthApi'
import { useAuth } from '@/context/AuthContext'

export const useApi = () => {
  const { token, logout } = useAuth()
  const client = new HttpClient(undefined, () => token, () => logout())
  return {
    auth: new AuthApi(client),
    users: new UserApi(client),
    subjects: new SubjectApi(client),
  }
}
