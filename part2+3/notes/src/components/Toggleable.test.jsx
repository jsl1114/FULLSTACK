import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel='show'>
        <div className='testDiv'>test content</div>
      </Toggleable>
    ).container
  })

  test('should render its children', async () => {
    await screen.findAllByText('test content')
  })

  test('At start the children are not dispalyed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display : none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const btn = screen.getByText('show')
    const cancelbtn = screen.getByText('cancel')
    await user.click(btn)
    await user.click(cancelbtn)

    expect(container.querySelector('.togglableContent')).toHaveStyle(
      'display : none'
    )
  })
})
