import { AiOutlineLike, AiOutlineDelete } from 'react-icons/ai'

const Blog = ({ title, author, url, handleDelete, likes, handleLike }) => {
  return (
    <div className='singleblog'>
      <AiOutlineDelete
        className='deletebtn'
        size={25}
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
      <AiOutlineLike
        size={20}
        onClick={handleLike}
        className='likebtn'
      />
      <div>{likes}</div>
    </div>
  )
}
export default Blog
