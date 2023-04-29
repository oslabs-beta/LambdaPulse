import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../src/components/Settings';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const server = setupServer(
  rest.get('/getCurrentArn', (req, res, ctx) => {
    return res(
      ctx.json({ rows: [{ role_arn: 'arn:aws:mock:arn:123456789012' }] })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

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
