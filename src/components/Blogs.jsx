import Blog from './Blog'

const Blogs = ({ blogs, likeData, deleteData }) =>
{
    blogs.sort(( a, b ) => b.likes - a.likes)

    return(
    <div className='blogs'>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <div key={`D_${blog.id}`} className='blog'>
                <Blog 
                    blog={blog}
                    likeData={likeData}
                    deleteData={deleteData}
                />
            </div>
        )}
    </div>
    )
}

export default Blogs