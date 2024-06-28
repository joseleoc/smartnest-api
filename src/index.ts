import { Hono } from 'hono'
import { corsMiddleware } from 'middlewares/cors'

import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'types/context';
import expensesRouter from 'expenses/routes';

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

const app = new Hono<Context>()
app.use(corsMiddleware())
app.route('/api/expenses', expensesRouter);

app.get('/', (c) => {
  return c.text('Hello smartnest!')
})

export default app satisfies ExportedHandler<Env>
