import { z } from "zod";

const bookingStatusSchema = z.enum(["CONFIRMED", "CANCELLED"]);

export const bookingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  seatId: z.string(),
  status: bookingStatusSchema.default("CONFIRMED"),
  createdAt: z.coerce.date(),
});

export const createBookingSchema = bookingSchema.omit({
  id: true,
  createdAt: true,
});

export type Booking = z.infer<typeof bookingSchema>;
export type CreateBooking = z.infer<typeof createBookingSchema>;