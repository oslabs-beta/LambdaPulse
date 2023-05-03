import { test } from 'vitest';
import { chromium } from 'playwright';
import server from './server-mock';

// setting up mock server for tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('Home page loads', async ({ expect }) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173'); // Replace with your app's URL

  const pageTitle = await page.title();
  expect(pageTitle).toBe('LambdaPulse'); // Replace with your app's title

  await browser.close();
});