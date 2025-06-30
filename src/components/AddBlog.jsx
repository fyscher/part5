const AddBlog = ({
    newTitle,
    newAuthor,
    newURL,
    handleAddBlog,
    handleAuthorChange,
    handleTitleChange,
    handleURLChange
}) =>
{
    return (
        <div>
            <h3>New Blog:</h3>
            <form onSubmit={handleAddBlog}>
                <div>
                    Title: <input
                        value={newTitle}
                        onChange={handleTitleChange} />
                </div>
                <div>
                    Author: <input
                        value={newAuthor}
                        onChange={handleAuthorChange} />
                </div>
                <div>
                    URL: <input
                        value={newURL}
                        onChange={handleURLChange} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddBlog;