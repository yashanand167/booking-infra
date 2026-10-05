import { Hono } from "hono";
import type { Bindings, Variables } from "../types/env.types";
import { createBooking } from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth";

const bookingsRoute = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

bookingsRoute.post("/createBooking", authMiddleware, ...createBooking);

export default bookingsRoute;
