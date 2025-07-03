import Blog from './Blog'
import DelBlog from './DelBlog'

const Blogs = ({ blogs, data }) =>
{
    return(
    <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
        <div key={`D_${blog.id}`}>
            <Blog 
                blog={blog}
                data={data}
            />
            <DelBlog/>
        </div>
    )}
    </div>
    )
}

export default Blogs