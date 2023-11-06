import { AiOutlineLike, AiOutlineDelete } from 'react-icons/ai'
import Toggleable from './Toggleable'
import { useState } from 'react'

const Blog = ({
  title,
  author,
  url,
  handleDelete,
  likes,
  handleLike,
  user,
}) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='singleblog'>
      <AiOutlineDelete
        className='deletebtn'
        size={25}
        onClick={handleDelete}
      />
      <h3>{title}</h3>

      <div style={hideWhenVisible}>
        <button
          className='viewbtn'
          onClick={toggleVisibility}
        >
          detail
        </button>
      </div>

      <div
        style={showWhenVisible}
        className='togglableContent'
      >
        <div className='author'>
          <h4>by {author}</h4>
        </div>
        <div className='detailsfield'>
          <a
            href={url}
            target='_blank'
            rel='noreferrer'
          >
            <button className='viewbtn'>View</button>
          </a>
          <hr color='cornsilk' />
          <button
            className='logoutbtn'
            onClick={toggleVisibility}
          >
            cancel
          </button>
        </div>
      </div>

      <div className='likebtn'>
        <AiOutlineLike
          size={20}
          onClick={handleLike}
        />
        <div>{likes}</div>
      </div>
      <em className='postperson'>Posted by {user}</em>
    </div>
  )
}
export default Blog
