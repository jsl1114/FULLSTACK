import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
  },
})

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'ADD_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = (content) => {
//   return {
//     type: 'ADD_FILTER',
//     payload: content,
//   }
// }

export default filterSlice.reducer
export const { filterChange } = filterSlice.actions
