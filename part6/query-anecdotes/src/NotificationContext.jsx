/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  if (action.type === 'SHOW') {
    return action.payload
  }
  if (action.type === 'HIDE') {
    return ''
  }
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const vnd = useContext(NotificationContext)
  return vnd[0]
}

export const useNotificationDispatch = () => {
  const vnd = useContext(NotificationContext)
  return vnd[1]
}

export default NotificationContext
