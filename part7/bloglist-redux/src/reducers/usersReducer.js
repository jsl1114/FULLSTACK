import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('/api/users').then((res) => res.data)
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
export const { setUsers } = usersSlice.actions
