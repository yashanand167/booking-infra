import { Hono } from 'hono'
import usersRoute from './routes/users.route'

const app = new Hono()

app.get("/", (c) => {
  return c.json({
    message: "Booking Concurrency Lab",
  })
})

app.route('/api/v1/users', usersRoute)

Bun.serve({
  fetch: app.fetch,
  port: 3000,
})

export default app
