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
  return <button type="button" onClick={deleteBlog} data-cy="delete" >Delete</button>
}

export default DelBlog