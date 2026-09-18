import { createFactory } from "hono/factory";
import type { Variables } from "../types/env.types";
import { EventService } from "../services/event.service";
import { createEventSchema } from "../zod/event.schema";

const factory = createFactory<{
  Variables: Variables;
}>();

const eventService = new EventService();

export const createEvent = factory.createHandlers(async (c) => {
  try {
    const event = await c.req.json();

    const validatedEvent = createEventSchema.parse(event);

    const newEvent = await eventService.createEvent(
      validatedEvent
    );

    return c.json(newEvent, 201);
  } catch (error) {
    return c.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      500
    );
  }
});