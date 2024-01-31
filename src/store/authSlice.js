import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
      action.payload.token &&
        localStorage.setItem('token', action.payload.token)
    },
    logout(state) {
      state.user = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    addProject(state, action) {
      state.user.owned_projects.push(action.payload)
    },
    deleteProject(state, action) {
      state.user.owned_projects = state.user.owned_projects.filter(
        (project) => project !== action.payload
      )
    },
  },
})

export const { login, logout, addProject, deleteProject } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
