const DelBlog = ({ deleteData, id, title }) =>
{
    const deleteBlog = async e =>
    {
        e.preventDefault()
        deleteData({
            title,
            id
        })
    }
    return <button type="button" onClick={deleteBlog}>Delete</button>
}

export default DelBlog;