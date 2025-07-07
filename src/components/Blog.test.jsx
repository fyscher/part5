import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, vi } from 'vitest'

test('renders content', () =>
{
  const blog =
  {
    title: 'Hello All',
    author: 'Me',
    url: 'www.com',
    likes: 0,
    id: '2345'
  }

  const { container } = render(<Blog blog={blog} />)

  const element = screen.getByText('Title: Hello All')

  expect(element).toBeDefined()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Title: Hello All')
})

test('clicking the button calls event handler once', async () =>
{
  const blog =
  {
    title: 'Hello All',
    author: 'Me',
    url: 'www.com',
    likes: 0
  }
  const mockHandler = vi.fn()
  
  render(<Blog blog={blog} likeData={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText("Like")
  screen.debug(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('Blog renders title and author by default but not url and likes', async () =>
{
  const blog =
  {
    title: 'Hello All',
    author: 'Me',
    url: 'www.com',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const topHalf = container.querySelector('.top-half')
  const bottomHalf = container.querySelector('.bottom-half')

  expect(topHalf).not.toHaveStyle('display: none')
  expect(bottomHalf).toHaveStyle('display: none')
})

test('Blog renders url and likes when toggle is clicked', async () =>
{
  const blog = 
  {
    title: 'Hello All',
    author: 'Me',
    url: 'www.com',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const topHalf = container.querySelector('.top-half')
  const bottomHalf = container.querySelector('.bottom-half')
  const user = userEvent.setup()
  const button = screen.getByText('View')
  
  await user.click(button)

  expect(topHalf).not.toHaveStyle('display: none')
  expect(bottomHalf).not.toHaveStyle('display: none')

})