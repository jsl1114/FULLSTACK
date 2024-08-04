import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "Welcome to Jason's anecdotes app",
  reducers: {
    changeNotification(state, action) {
      state = action.payload
      return state
    },
  },
})

export default notificationSlice.reducer
export const { changeNotification } = notificationSlice.actions
