import { z } from "zod";

const eventFields = {
  name: z.string().min(2).max(100),
  date: z.coerce.date(),
  capacity: z.number().int().positive(),
};

export const eventSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  ...eventFields,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createEventSchema = z.object(eventFields);

export const updateEventSchema = z
  .object(eventFields)
  .partial();


export const deleteEventSchema = z.object({
  id: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type DeleteEvent = z.infer<typeof deleteEventSchema>;