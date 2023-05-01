import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import App from '../client/src/App';
import Login from '../client/src/pages/Login';
import Signup from '../client/src/pages/Signup';
import Settings from '../client/src/components/Settings';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import server from './server-mock';

// setting up mock server for tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// testing App.jsx
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



describe('correctly render Login', () => {
  beforeEach(() => render(<Login />, { wrapper: BrowserRouter }));

  test('correctly renders input fields in Login', async () => {
    // check email input exists
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    // check password input exists
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      'type',
      'password'
    );
    // password field not accessible over selector, input with type password has no role
    const inputs = await screen.getAllByRole('textbox');
    expect(inputs.length).toEqual(1);
  });

  test('correctly renders 2 buttons in Login', async () => {
    const button = await screen.getAllByRole('button');
    expect(button.length).toEqual(2);
  });

  test('correctly renders link to Signup in Login', async () => {
    const link = await screen.getAllByRole('link');
    expect(link.length).toEqual(1);
  });
});

// testing Signup.jsx

describe('correctly render Signup', () => {
  beforeEach(() => render(<Signup />, { wrapper: BrowserRouter }));

  test('correctly renders input fields in Signup', async () => {
    // check username input exists
    expect(screen.getByLabelText(/First and Last Name/i)).toHaveAttribute(
      'type',
      'text'
    );
    // check email input exists
    expect(screen.getByLabelText(/Email/i)).toHaveAttribute('type', 'email');
    // check password input exists
    const passwordInputs = screen.getAllByLabelText(/Password/i);
    const passwordInput = passwordInputs.find(
      (input) => input.getAttribute('id') === 'password'
    );
    expect(passwordInput).toHaveAttribute('type', 'password');
    // password confirmation input exists
    const confirmPasswordInputs = screen.getAllByLabelText(/Confirm Password/i);
    const confirmPasswordInput = confirmPasswordInputs.find(
      (input) => input.getAttribute('id') === 'confirm-password'
    );
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    const inputs = await screen.getAllByRole('textbox');
    expect(inputs.length).toEqual(2);
  });

  test('correctly renders 2 button in Signup', async () => {
    const button = await screen.getAllByRole('button');
    expect(button.length).toEqual(2);
  });

  test('correctly renders link to Login in Signup', async () => {
    const link = await screen.getAllByRole('button', {
      name: /LOGIN/i,
    });
    expect(link.length).toEqual(1);
  });
});

describe('correctly render Settings', () => {
  beforeEach(() => render(<Settings />, { wrapper: BrowserRouter }));

  test('correctly renders header in Settings', () => {
    expect(
      screen.getByRole('heading', { name: /settings/i })
    ).toBeInTheDocument();
  });

  test('correctly renders current ARN in Settings', () => {
    const currentArnText = screen.getByText(/current arn/i);
    expect(currentArnText).toBeInTheDocument();
  });

  test('correctly renders button and input field in Settings', async () => {
    const button = await screen.getAllByRole('button');
    expect(button.length).toEqual(1);

    const input = screen.getByPlaceholderText('ARN Key');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  test('correctly renders submit button in Settings', () => {
    const submitButton = screen.getByRole('button', { name: /set arn/i });
    expect(submitButton).toBeInTheDocument();
  });
});