import { AiOutlineLike, AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react'

const Blog = ({ title, author, url, handleDelete }) => {
  const [likes, setLikes] = useState(0)

  return (
    <div className='singleblog'>
      <AiOutlineDelete
        className='deletebtn'
        size={20}
        onClick={handleDelete}
      />
      <h3>{title}</h3>
      <h4>by {author}</h4>
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
      >
        <button className='viewbtn'>View</button>
      </a>
      <hr color='cornsilk' />
      <button
        onClick={() => {
          setLikes(likes + 1)
        }}
        className='likebtn'
      >
        <AiOutlineLike size={20} />
      </button>
      {likes !== 0 && <div>{likes}</div>}
    </div>
  )
}
export default Blog
