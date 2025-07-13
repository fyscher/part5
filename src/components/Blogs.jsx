import Blog from './Blog'

const Blogs = ({ blogs, likeData, deleteData, user }) =>
{

  return(
    <div className='blogs'>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <div key={`D_${blog.id}`}>
          <Blog
            blog={blog}
            likeData={likeData}
            deleteData={deleteData}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default Blogs