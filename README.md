Booking Concurrency Lab

A small backend lab for understanding race conditions, concurrency, and database consistency in real-world booking systems.

I built this repository because concurrency is one of those backend concepts that is easy to understand theoretically but much harder to truly understand until you can reproduce the problem yourself.

The idea is simple:

What happens when two users try to book the last available spot at exactly the same time?

A naive implementation might:

1. Check how many spots are available.
2. See that a spot exists.
3. Create the booking.

That looks perfectly reasonable when requests are handled one at a time.

But with concurrent requests, both requests can observe the same state before either one creates a booking.

Request A ──→ Check availability ──→ Available
                                      ↓
Request B ──→ Check availability ──→ Available
                                      ↓
             Both create a booking
                                      ↓
                         Overbooking

This repository is an experiment to understand why that happens and how to prevent it.

What I’m exploring

* Request concurrency
* Race conditions
* Database transactions
* Atomic operations
* PostgreSQL isolation and locking
* Prisma
* Redis and distributed concurrency concepts
* Designing reliable booking logic
* Testing concurrent requests

The goal isn’t to build a production-ready booking platform.

The goal is to break a naive implementation, observe exactly why it breaks, and then progressively make it correct.

Tech Stack

* Bun
* Hono
* TypeScript
* Prisma
* PostgreSQL
* Zod

Project Structure

src/
├── controllers/
├── services/
├── routes/
├── schemas/
├── lib/
└── index.ts
prisma/
└── schema.prisma

The application follows a simple flow:

Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL

Getting Started

Install dependencies:

bun install

Run the development server:

bun run dev

Open:

http://localhost:3000

Why this repository exists

I’m using this project as a hands-on way to understand backend systems beyond simply making an API work.

The interesting question isn’t:

“Can I create a booking?”

It’s:

“Can I guarantee that my booking system remains correct when many requests happen at the same time?”

That’s the problem this lab is built around.