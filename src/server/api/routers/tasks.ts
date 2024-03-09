import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.task.findUniqueOrThrow({
      where: {
        id: parseInt(input),
      },
    });
  }),
  listByUserId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.task.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  addTask: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        isCompleted: z.boolean(),
        isImportant: z.boolean(),
        assignedTo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      var task = await ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          isCompleted: input.isCompleted,
          isImportant: input.isImportant,
          userId: ctx.session.user.id,
          assignedTo: input.assignedTo,
        },
      });

      return task;
    }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.update({
        where: { id: input.id },
        data: { isCompleted: input.isCompleted },
      });
      return task;
    }),
  deleteTask: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.task.delete({
        where: {
          id: input,
        },
      });
    }),
});
