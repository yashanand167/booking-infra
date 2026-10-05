import {createFactory} from 'hono/factory'
import {prisma} from '../lib/prisma'
import {CreateBooking} from '../zod/booking.schema'

// here is where the real concurrency lies

export class BookingService {
    async createBooking(booking: CreateBooking) {
        return prisma.$transaction(async (tx) => {
            const existingBooking = await tx.booking.findFirst({
                where: {
                    userId: booking.userId,
                    eventId: booking.eventId
                }
            })

            
        })

    }
}