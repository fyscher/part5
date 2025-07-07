import { useState } from 'react'
import DelBlog from './DelBlog'

const Blog = ({ blog, likeData, deleteData }) =>
{
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible? 'none' : '' }
  const showWhenVisible = { display: visible? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  const like = async e =>
  {
    e.preventDefault()
    setLikes(likes + 1)
    likeData({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      id: blog.id
    })
  }

  return(
    <div id={blog.id} className='blog'>
      <div className='top-half'>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='bottom-half'>
        <p>URL: {blog.url}</p>
        <p>Likes: {likes}</p><button onClick={like}>Like</button>
        <button onClick={toggleVisibility}>Close</button>
      </div>
      <DelBlog
        deleteData={deleteData}
        id={blog.id}
        title={blog.title}
      />
    </div>
  )
}

export default Blog