import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/getCurrentArn', (req, res, ctx) => {
    return res(
      ctx.json({ rows: [{ role_arn: 'arn:aws:mock:arn:123456789012' }] })
    );
  }),
);

export default server;