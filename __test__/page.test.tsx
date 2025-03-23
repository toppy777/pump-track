import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Users from '../src/features/user/components/users'
import { User } from '../src/features/user/user'
 
describe('Home', () => {

    const users: User[] = [
        {
            id: 1,
            email: 'hogehoge.example.com',
            name: 'hogehoge'
        },
        {
            id: 2,
            email: 'fugafuga.example.com',
            name: 'fugafuga'
        },
    ]

  it('render users', () => {
    render(<Users users={users} />)
    expect(screen.getByText('Users: 2')).toBeInTheDocument()
  })
})