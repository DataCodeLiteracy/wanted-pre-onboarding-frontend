import APIClient from './Apiclient'

interface AuthData {
  email: string
  password: string
}

const SIGN_UP = '/signup'
const SIGN_IN = '/signin'

export const authApi = new APIClient(
  process.env.REACT_APP_REQUEST_URL + '/auth'
)

export const signUpUser = async (body: AuthData) => {
  return await authApi.post(SIGN_UP, {
    email: body.email,
    password: body.password
  })
}

export const signInUser = async (body: AuthData) => {
  return await authApi.post<{ access_token: string }>(SIGN_IN, {
    email: body.email,
    password: body.password
  })
}
