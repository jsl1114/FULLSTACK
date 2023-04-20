const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, likes) => {
    return sum + likes
  }

  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce(reducer, 0)
}

const favBlog = (blogs) => {
  let mostLiked = { likes: 0 }
  const reducer = (ans, blog) => {
    ans = blog.likes > mostLiked.likes ? blog : mostLiked
    mostLiked = ans
    return ans
  }

  return blogs.length === 0 ? undefined : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  let mostBlogscnt = { blogs: 0 }
  const authors = blogs.map(({ author }) => ({ author: author, blogs: 1 }))
  let temp = []
  authors.forEach((author) => {
    const objIndex = temp.findIndex((i) => i.author === author.author)
    if (objIndex !== -1) {
      temp[objIndex].blogs += 1
    } else {
      temp.push(author)
    }
  })
  return blogs.length === 0
    ? undefined
    : temp.reduce((ans, blog) => {
        ans = blog.blogs > mostBlogscnt.blogs ? blog : mostBlogscnt
        mostBlogscnt = ans
        return ans
      }, 0)
}

const mostLikes = (blogs) => {
  let mostLiked = { likes: 0 }
  const authors = blogs.map(({ author, likes }) => ({ author: author, likes: likes }))
  let temp = []
  authors.forEach((b) => {
    const objIndex = temp.findIndex((i) => (i.author === b.author))
    if (objIndex !== -1) {
      temp[objIndex].likes += b.likes
    } else {
      temp.push(b)
    }
  })
  return blogs.length === 0
    ? undefined
    : temp.reduce((ans, blog) => {
        ans = blog.likes >= mostLiked.likes ? blog : mostLiked
        mostLiked = ans
        return ans
      }, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs,
  mostLikes,
}
