import { useState } from "react"

const Blog = ({ blog, data }) => 
{
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible? 'none' : '' }
  const showWhenVisible = { display: visible? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const like = e =>
  {
    e.preventDefault()
    data({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    })
  }

  return(
    <div id={blog.id}>
      <div>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p><button onClick={like}>Like</button>
        <button onClick={toggleVisibility}>Close</button>
      </div>
    </div>  
  )
}

export default Blog