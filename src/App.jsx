import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const newObject =
  {
    title: newTitle,
    author: newAuthor,
    url: newURL
  }

  const handleTitleChange = e => setNewTitle(e.target.value)
  const handleAuthorChange = e => setNewAuthor(e.target.value)
  const handleURLChange = e => setNewURL(e.target.value)

  const notify = (label, message) =>
  {
    setErrorStatus(label);
    setErrorMessage(message);
    setTimeout(() => {setStatusMessage(null)}, 5000);
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(()=>
  {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async e =>
  {
    e.preventDefault()
    
    try
    {
      const user = await loginService.login
      ({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception)
    {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () =>
  {
    window.localStorage.removeItem('loggedBlogUser')
      blogService.setToken('')
      setUser('')
      location.reload()
  }

  // add all handlers here
  const handleAddBlog = async e =>
  {
    e.preventDefault()
    try
    {
      const res = await blogService.create(newObject)
      setBlogs(blogs.concat(res))
      notify('error', `${newTitle} has been added!`)
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
    }
    catch (exception)
    {
      console.log(exception)
      setErrorMessage('Cannot Add Blog')
      setTimeout(()=> setErrorMessage(null), 5000)
    } 
  }

  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        errorStatus={errorStatus}
      />
      { user === null
        ? <Login
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        : <div>
            { user ?<p>{user.name} currently logged in</p> :null}
            <AddBlog
              newTitle={newTitle}
              newAuthor={newAuthor}
              newURL={newURL}
              handleAddBlog={handleAddBlog}
              handleAuthorChange={handleAuthorChange}
              handleTitleChange={handleTitleChange}
              handleURLChange={handleURLChange}
            />
            <button onClick={handleLogout}>Log Out</button>
            <Blogs
              blogs={blogs}
              />
          </div>
      }
    </div>
  )
}

export default App