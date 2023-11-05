import { AiOutlineLike, AiOutlineDelete } from 'react-icons/ai'
import Toggleable from './Toggleable'

const Blog = ({
  title,
  author,
  url,
  handleDelete,
  likes,
  handleLike,
  user,
}) => {
  return (
    <div className='singleblog'>
      <AiOutlineDelete
        className='deletebtn'
        size={25}
        onClick={handleDelete}
      />
      <h3>{title}</h3>
      <Toggleable
        buttonLabel='details'
        closeLabel='hide'
      >
        <h4>by {author}</h4>
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
        >
          <button className='viewbtn'>View</button>
        </a>
        <hr color='cornsilk' />
      </Toggleable>
      <AiOutlineLike
        size={20}
        onClick={handleLike}
        className='likebtn'
      />
      <div>{likes}</div>
      <em className='postperson'>Posted by {user}</em>
    </div>
  )
}
export default Blog
