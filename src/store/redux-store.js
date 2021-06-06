import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice/auth-slice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})

export default store
