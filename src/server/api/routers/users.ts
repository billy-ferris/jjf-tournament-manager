import { Prisma } from "@prisma/client";
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
 *
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  image: true,
  phone: true,
  teamId: true,
});

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.user.findMany({
        select: defaultUserSelect,
      })
  ),

  getAllByTeamId: publicProcedure.input(z.string().uuid()).query(
    async ({ ctx, input }) =>
      await ctx.prisma.user.findMany({
        where: {
          teamId: input,
        },
        select: defaultUserSelect,
      })
  ),

  getOne: publicProcedure.input(z.string().uuid()).query(
    async ({ ctx, input }) =>
      await ctx.prisma.user.findUniqueOrThrow({
        where: { id: input },
        select: { ...defaultUserSelect, isOnboarded: true },
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
          teamId: z.string().uuid(),
          teamName: z.string().min(1),
        })
        .partial({
          name: true,
          email: true,
          phone: true,
          isOnboarded: true,
          teamId: true,
          teamName: true,
        })
    )
    .mutation(async ({ ctx, input }) => {
      let updateInput: Prisma.UserUpdateInput = input;

      if (input.teamName) {
        const { teamName, ...userInput } = input;

        updateInput = {
          ...userInput,
          team: {
            create: {
              name: teamName,
              captainId: input.id,
            },
          },
        };
      }

      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: updateInput,
        select: defaultUserSelect,
      });
    }),
});
