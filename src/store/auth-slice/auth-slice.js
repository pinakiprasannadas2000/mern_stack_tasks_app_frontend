import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  authToken: localStorage.getItem('authToken'),
  isLoggedIn: localStorage.getItem('isLoggedIn'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.authToken = action.payload
      state.isLoggedIn = true
      localStorage.setItem('authToken', action.payload)
      localStorage.setItem('isLoggedIn', true)
    },
    logout(state) {
      state.authToken = null
      state.isLoggedIn = false
      localStorage.removeItem('authToken')
      localStorage.removeItem('isLoggedIn')
    },
  },
})

export const authActions = authSlice.actions

export default authSlice
