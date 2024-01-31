import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './authSlice'
import projectReducer from './projectSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
  middleware: [thunk],
})

export default store
