import Blog from './Blog'
import DelBlog from './DelBlog'

const Blogs = ({ blogs }) =>
{
    return(
    <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
        <div key={`D_${blog.id}`}>
            <Blog 
                blog={blog}
                id={blog.id}
            />
            <DelBlog
                id={blog.id}
            />
        </div>
    )}
    </div>
    )
}

export default Blogs