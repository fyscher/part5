import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () =>
{
    const addBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm newObject={addBlog} />)

    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('URL')
    const sendButton = screen.getByText('Create')

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'Test URL')
    await user.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(addBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(addBlog.mock.calls[0][0].url).toBe('Test URL')
})