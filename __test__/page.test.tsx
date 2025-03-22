import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { User, Home } from '../src/app/lib/users'
 
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

  it('renders users', () => {
    render(<Home users={users} />)
    expect(screen.getByText('Users: 2')).toBeInTheDocument()
  })
})