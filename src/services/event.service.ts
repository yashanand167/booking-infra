import { CreateEvent } from "../zod/event.schema";
import { prisma } from "../lib/prisma";

export class EventService {
  async createEvent(event: CreateEvent) {
    const checkUser = await prisma.user.findUnique({
      where: {
        id: event.creatorId,
      },
    });

    if (!checkUser) {
      throw new Error("User with this ID does not exist");
    }

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