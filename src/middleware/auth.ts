import { createMiddleware } from "hono/factory";
import { prisma } from "../lib/prisma";

export const authMiddleware = createMiddleware(async (c, next) => {
     const userId = c.req.header("x-user-id");

    if (!userId) {
        return c.json(
        { error: "Authentication required" },
        401
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return c.json(
        { error: "User not found" },
        404
        );
    }

    c.set("userId", user.id);

    await next();
})