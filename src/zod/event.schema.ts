import {z} from "zod";

export const eventSchema = z.object({
  id: z.string().uuid(),
  creatorId: z.string().uuid(),
  name: z.string().min(2).max(100),
  date: z.date(),
  capacity: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createEventSchema = eventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const updateEventSchema = eventSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const deleteEventSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteEvent = z.infer<typeof deleteEventSchema>;

export type UpdateEvent = z.infer<typeof updateEventSchema>;

export type CreateEvent = z.infer<typeof createEventSchema>;

export type Event = z.infer<typeof eventSchema>;