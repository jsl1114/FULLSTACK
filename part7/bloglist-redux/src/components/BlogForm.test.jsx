import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  const handleSave = jest.fn()
  render(<BlogForm onSave={handleSave} />)

  const savebtn = screen.getByText('Save')
  const titleField = screen.getByPlaceholderText('enter title here')
  const authorField = screen.getByPlaceholderText('enter author here')
  const urlField = screen.getByPlaceholderText('enter url here')

  await user.type(titleField, 'test title')
  await user.type(authorField, 'test author')
  await user.type(urlField, 'test url')

  await user.click(savebtn)

  expect(handleSave.mock.calls[0][0].title).toBe('test title')
  expect(handleSave.mock.calls[0][0].author).toBe('test author')
  expect(handleSave.mock.calls[0][0].url).toBe('test url')
})
