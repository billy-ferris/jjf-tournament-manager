import { type User } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { phoneRegExp } from "~/utils/phoneRegExp";

/**
 * Default selector for User.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
// const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
//   id: true,
//   name: true,
//   email: true,
//   phone: true,
// });

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(
    async ({ ctx }): Promise<User[]> =>
      await ctx.prisma.user.findMany({
        // select: defaultUserSelect,
      })
  ),
  getOne: publicProcedure.input(z.string().uuid()).query(
    async ({ ctx, input }): Promise<User> =>
      await ctx.prisma.user.findUniqueOrThrow({
        where: { id: input },
      })
  ),
  update: protectedProcedure
    .input(
      z
        .object({
          id: z.string().uuid(),
          name: z.string().min(1),
          email: z.string().min(1).email(),
          phone: z.string().min(1).regex(phoneRegExp),
          isOnboarded: z.boolean(),
        })
        .required({
          id: true,
        })
    )
    .query(
      async ({ ctx, input }): Promise<User> =>
        await ctx.prisma.user.update({
          where: { id: input.id },
          data: {
            name: input.name,
            email: input.email,
            phone: input.phone,
            isOnboarded: input.isOnboarded,
          },
        })
    ),
});
