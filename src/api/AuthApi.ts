import { REQUEST_URL } from './requestUrl'
import APIClient from './Apiclient'
import localToken from './LocalToken'

interface AuthData {
  email: string
  password: string
}

type AuthEndPoint = '/signup' | '/signin'

const authApi = new APIClient(REQUEST_URL + '/auth', localToken.get())

export const authUser = async (endpoint: AuthEndPoint, body: AuthData) => {
  return await authApi.post(endpoint, {
    email: body.email,
    password: body.password
  })
}
