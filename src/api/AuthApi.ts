import axios from 'axios'

interface AuthApiProps {
  SIGN: string
  email: string
  password: string
}

const AuthApi = async ({ SIGN, email, password }: AuthApiProps) => {
  const res = await axios.post(
    SIGN,
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
