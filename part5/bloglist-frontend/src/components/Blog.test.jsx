import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Blog from './Blog'

test('should only render title and likes by default', () => {
  const container = render(
    <Blog
      title={'test title'}
      url={'test url'}
      likes={1}
      author={'Jason'}
    />
  ).container

  const div = container.querySelector('.togglableContent')

  expect(div).toHaveStyle('display: none')
})

test('When detail button is clicked, hidden values are shown', async () => {
  const user = userEvent.setup()
  const container = render(
    <Blog
      title={'test title'}
      url={'test url'}
      likes={1}
      author={'Jason'}
    />
  ).container

  const btn = container.querySelectorAll('.viewbtn')[0]

  await user.click(btn)

  expect(container.querySelector('.togglableContent')).not.toHaveStyle(
    'display: none'
  )
})

test('if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
  const user = userEvent.setup()
  const twice = jest.fn()
  const container = render(
    <Blog
      title={'test title'}
      url={'test url'}
      likes={1}
      author={'Jason'}
      handleLike={twice}
    />
  ).container

  const likeBtn = container.querySelector('.likebtn')
  await user.dblClick(likeBtn)

  expect(twice.mock.calls).toHaveLength(2)
})
