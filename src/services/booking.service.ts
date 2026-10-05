import {createFactory} from 'hono/factory'
import {prisma} from '../lib/prisma'
import {CreateBooking} from '../zod/booking.schema'

// here is where the real concurrency lies

export class BookingService {
    async createBooking(booking: CreateBooking) {
        return prisma.$transaction(async(tx) => {
            const existingBooking = await tx.booking.findFirst({
                where: {
                    eventId: booking.eventId,
                    seatId: booking.seatId,
                    status: "CONFIRMED"
                }
            })

            if (existingBooking) {
                throw new Error("Seat is already booked")
            }

            const seats = await tx.$queryRaw<
                Array<{
                id: string
                eventId: string
                number: number
                status: string
                }>
            >
            `
                SELECT "id", "eventId", "number", "status"
                FROM "Seat"
                WHERE "id" = ${booking.seatId}
                FOR UPDATE
            `

            const seat = seats[0]
            
            if (!seat) {
                throw new Error("Seat not found")
            }

            if(seat.id !== booking.seatId) {
                throw new Error("Seat ID mismatch")
            }

            if (seat.status !== "AVAILABLE") {
                throw new Error("Seat is not available")
            }

            await tx.seat.update({
                where: {
                    id: booking.seatId
                },
                data: {
                    status: "BOOKED"
                }
            })

            const newBooking = await tx.booking.create({
                data: {
                    ...booking,
                    status: "CONFIRMED"
                }
            })

            return newBooking
        })
    }
}