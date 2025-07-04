import './static/App.css'
import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()  

  const notify = (label, message) =>
  {
    setErrorStatus(label);
    setErrorMessage(message);
    setTimeout(() => {setErrorMessage(null)}, 5000);
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

  const login = async userCreds =>
  {
    try
    {
      const user = await loginService.login(userCreds)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }
    catch (exception)
    {
      console.log(exception)
      notify('error', 'Wrong Credentials')
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
  const addBlog = async newObject =>
  {
    try
    {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.create(newObject)
      setBlogs(blogs.concat(res))
      notify('success', `${res.title} has been added!`)
    }
    catch (exception)
    {
      console.log(exception)
      notify('error', 'Cannot Add Blog')
    } 
  }

  const like = async ({title, author, url, likes, id}) =>
  {
    const updateObject = { title, author, url, likes }
    const res = await blogService.update(id, updateObject)
    console.log('res ', res)
    console.log('res.id ', res.id)
    const newBlogs = blogs.map( i => i.id !== res.id? i: res)
    console.log('blogs ', blogs)
    console.log('newBlogs ', newBlogs)
    setBlogs(newBlogs)
    location.reload()
  }

  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        errorStatus={errorStatus}
      />
      { user
      ? <div>
        <p>{user.name} currently logged in</p>
        <button onClick={handleLogout}>Log Out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm newObject={addBlog} />
        </Togglable>
        <Togglable buttonLabel="Blogs">
          <Blogs 
            blogs={blogs}
            data={like}
          />
        </Togglable> 
      </div>
      : <Togglable buttonLabel="Login">
        <LoginForm userCreds={login} />
      </Togglable> }
    </div>
  )
}

export default App