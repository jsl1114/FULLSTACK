import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

export const createStore = () => {
  return configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notificationReducer,
      filter: filterReducer,
    },
  })
}
