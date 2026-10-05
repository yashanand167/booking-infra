import { createFactory } from "hono/factory";
import type { Variables } from "../types/env.types";
import { BookingService } from "../services/booking.service";
import { createBookingSchema } from "../zod/booking.schema";

const factory = createFactory<{
  Variables: Variables;
}>();
const bookingService = new BookingService();

export const createBooking = factory.createHandlers(async (c) => {
  try {
    const body = await c.req.json();
    const userId = c.get("userId");

    if (body.userId && body.userId !== userId) {
      return c.json({ error: "User mismatch" }, 401);
    }

    const result = createBookingSchema.safeParse({
      ...body,
      userId,
    });

    if (!result.success) {
      return c.json(
        {
          error: "Validation failed",
          issues: result.error.issues,
        },
        400,
      );
    }

    const newBooking = await bookingService.createBooking(result.data);

    return c.json(newBooking, 201);
  } catch (error) {
    console.error(error);

    return c.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      500,
    );
  }
});
