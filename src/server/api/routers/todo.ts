import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createInput, toggleInput, updateInput } from "~/server/types";

// todo用のルーターを定義
export const todoRouter = createTRPCRouter({
    // allという名のプロシージャ（関数）を定義
    // queryでクエリを実行できる
    all: protectedProcedure.query(async ({ ctx }) => {
        // prismaで作成されたtodoを作成順に取得
        // 取得するデータはid, text, isCompletedだけ
        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return todos.map(({ id, text, isCompleted }) => ({
            id,
            text,
            isCompleted,
        }));
    }),
    // プロシージャの実行前にinputでzodによるバリデーヨンを実施
    // mutaionで更新処理を実行できる
    create: protectedProcedure.input(createInput).mutation(({ ctx, input }) => {
        return ctx.prisma.todo.create({
            data: {
                text: input,
                user: {
                    connect: {
                        id: ctx.session.user.id,
                    },
                },
            },
        });
    }),
    toggle: protectedProcedure.input(toggleInput).mutation(({ ctx, input }) => {
        const { id, is_completed } = input;
        return ctx.prisma.todo.update({
            where: {
                id,
            },
            data: {
                isCompleted: is_completed,
            },
        });
    }),
    update: protectedProcedure.input(updateInput).mutation(({ ctx, input }) => {
        const { id, text } = input;
        return ctx.prisma.todo.update({
            where: {
                id,
            },
            data: {
                text,
            },
        });
    }),
    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.todo.delete({
            where: {
                id: input,
            },
        });
    }),
});