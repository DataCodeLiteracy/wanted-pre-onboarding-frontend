import axios from 'axios'
import { REQUEST_URL } from './requestUrl'

interface AuthApiProps {
  endpoint: string
  email: string
  password: string
}

const AuthApi = async ({ endpoint, email, password }: AuthApiProps) => {
  const res = await axios.post(
    REQUEST_URL + endpoint,
    {
      email,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return res
}

export default AuthApi
