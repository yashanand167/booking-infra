import { createFactory } from "hono/factory";
import { UserService } from "../services/user.service";
import { createUserSchema } from "../zod/user.schema";

const factory = createFactory();
const userService = new UserService();

export const createUser = factory.createHandlers(async (c) => {
  try {
    const body = await c.req.json();

    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        {
          error: "Validation failed",
          issues: result.error.issues,
        },
        400,
      );
    }

    const newUser = await userService.createUser(result.data);

    return c.json(newUser, 201);
  } catch (error) {
    console.error(error);

    return c.json(
      {
        error: "Internal server error",
      },
      500,
    );
  }
});