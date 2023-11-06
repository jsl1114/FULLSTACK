const Notification = ({ msg, type }) => {
  if (msg === null) return null
  return (
    <div className={type === 'success' ? 'success' : 'error'}>{msg}</div>
  )
}
export default Notification
