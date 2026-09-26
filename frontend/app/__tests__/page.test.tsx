import { render, screen } from '@testing-library/react'
import Home from '../page'

test('renders the home page without crashing', () => {
  render(<Home />)
  expect(screen.getByText(/page.tsx/i)).toBeInTheDocument()
})