import { useState, forwardRef, useImperativeHandle } from 'react'

// takes buttonLabel, closeLabel
const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className='viewbtn'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className='logoutbtn'
          onClick={toggleVisibility}
        >
          {props.closeLabel ? props.closeLabel : 'cancel'}
        </button>
      </div>
    </div>
  )
})

export default Toggleable
