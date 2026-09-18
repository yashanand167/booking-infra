import { CreateEvent } from "../zod/event.schema";
import { prisma } from "../lib/prisma";

export class EventService {
  async createEvent(event: CreateEvent) {
    const newEvent = await prisma.event.create({
      data: {
        ...event,
      },
    });

    return {
      id: newEvent.id,
      name: newEvent.name,
      date: newEvent.date,
      createdAt: newEvent.createdAt,
    };
  }
}