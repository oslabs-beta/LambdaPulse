// login.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';

import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// test('display error message when submitting an empty form', async () => {
//   render(<Login />, { wrapper: BrowserRouter });

//   const submitButton = screen.getByRole('button', { name: /log in/i });
//   userEvent.click(submitButton);

//   const errorMessage = await screen.findByTestId('error-message');
//   expect(errorMessage).toHaveTextContent('Invalid password or email');
// });

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
