import blogService from '../services/blogs'

const DelBlog = ({ id }) =>
{
    const handleDeleteBlog = async e =>
    {
        e.preventDefault()
        try{
        console.log(id)
        const res = await blogService.remove(id)
        console.log(res.data)
        }
        catch (exception)
        {
        console.log(exception)
        }
    }
    return <button type="button" onClick={handleDeleteBlog}>Delete</button>
}

export default DelBlog;