import { useSelector } from 'react-redux'
import Notification from './Notification'

const Header = () => {
  const user = useSelector((s) => s.user)

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      window.localStorage.clear()
      window.location.reload()
      dispatch(changeNotification('You are logged out'))
    }
  }

  return (
    <>
      <h1>Blogg!</h1>
      <Notification />
      <div className='header'>
        user: {user.name}
        <button
          className='logoutbtn'
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </>
  )
}
export default Header
