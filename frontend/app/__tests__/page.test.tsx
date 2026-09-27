import { render, screen, waitFor } from '@testing-library/react'
import Home from '../page'

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 'ok',
          items: ['Configurar Docker', 'Automatizar CI', 'Publicar no GHCR'],
        }),
    })
  ) as jest.Mock
})

test('renders the home page without crashing', async () => {
  render(<Home />)
  await waitFor(() => {
    expect(screen.getByText(/status: ok/i)).toBeInTheDocument()
  })
})