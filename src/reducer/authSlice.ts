import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  email: string
  password: string
  accessToken: string
}

const initialState: AuthState = {
  email: '',
  password: '',
  accessToken: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    }
  }
})

export const { setEmail, setPassword, setAccessToken } = authSlice.actions

export default authSlice.reducer
