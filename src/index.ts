import { Hono } from 'hono'

const app = new Hono()

app.get("/", (c) => {

  return c.json({
    message: "Booking Concurrency Lab",
  });

});

Bun.serve({
  fetch: app.fetch,
  port: 3000,
})

export default app
