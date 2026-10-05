import { z } from "zod";

const seatStatusSchema = z.enum(["AVAILABLE", "RESERVED", "BOOKED"]);

export const seatSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  number: z.number().int().positive(),
  status: seatStatusSchema.default("AVAILABLE"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createSeatSchema = seatSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Seat = z.infer<typeof seatSchema>;
export type CreateSeat = z.infer<typeof createSeatSchema>;