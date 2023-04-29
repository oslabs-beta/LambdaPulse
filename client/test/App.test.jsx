// app.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

test('full app rendering/navigating', async () => {
  render(<App />, { wrapper: BrowserRouter });
  const user = userEvent.setup();

  // verify page content for default route (Login page)
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  screen.debug();

  // verify page content for expected route after navigating (Signup page)
  userEvent.click(screen.getByRole('link', { name: /Sign Up/i }));
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});
