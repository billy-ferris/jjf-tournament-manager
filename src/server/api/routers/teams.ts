import { type Team } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        captainId: z.string().uuid(),
      })
    )
    .mutation(
      async ({ ctx, input }): Promise<Team> =>
        await ctx.prisma.team.create({
          data: {
            name: input.name,
            captainId: input.captainId,
          },
        })
    ),
  getAll: publicProcedure.query(
    async ({ ctx }): Promise<Team[]> =>
      await ctx.prisma.team.findMany({
        include: {
          captain: true,
          members: true,
        },
      })
  ),
  getOne: publicProcedure.input(z.string().uuid()).query(
    async ({ ctx, input }): Promise<Team> =>
      await ctx.prisma.team.findUniqueOrThrow({
        where: { id: input },
      })
  ),
});
