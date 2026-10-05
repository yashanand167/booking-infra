import { prisma } from '../src/lib/prisma'

async function main() {
  const userA = await prisma.user.create({
    data: {
      email: "user-a@test.com",
      name: "User A",
      password: "password",
    },
  })

  const userB = await prisma.user.create({
    data: {
      email: "user-b@test.com",
      name: "User B",
      password: "password",
    },
  })

  const event = await prisma.event.create({
    data: {
      name: "Test Event",
      capacity: 10,
      date: new Date(),
    },
  })

  const seat = await prisma.seat.create({
    data: {
      eventId: event.id,
      number: 1,
    },
  })

//   console.log({
//     userA: userA.id,
//     userB: userB.id,
//     event: event.id,
//     seat: seat.id,
//   })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())