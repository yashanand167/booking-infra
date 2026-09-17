import {z} from "zod";

export const bookingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  eventId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Booking = z.infer<typeof bookingSchema>;