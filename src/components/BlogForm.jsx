import { useState } from 'react'

const BlogForm = ({ newObject }) =>
{
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = e => setNewTitle(e.target.value)
  const handleAuthorChange = e => setNewAuthor(e.target.value)
  const handleURLChange = e => setNewURL(e.target.value)

  const addBlog = e =>
  {
    e.preventDefault()
    newObject({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h3>New Blog:</h3>
      <form onSubmit={addBlog}>
        <div>
          Title: <input
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='Title'
            id='Title'
          />
        </div>
        <div>
          Author: <input
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='Author'
            id='Author'
          />
        </div>
        <div>
          URL: <input
            value={newURL}
            onChange={handleURLChange} 
            placeholder='URL'
            id='URL'
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm