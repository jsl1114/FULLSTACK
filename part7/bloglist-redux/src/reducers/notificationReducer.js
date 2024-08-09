import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome!',
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
  },
})

export default notificationSlice.reducer
export const { changeNotification } = notificationSlice.actions
