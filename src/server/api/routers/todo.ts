import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createInput, changeStatusInput, updateInput } from "~/server/types";

// todo用のルーターを定義
export const todoRouter = createTRPCRouter({
    // allという名のプロシージャ（関数）を定義
    // queryでクエリを実行できる
    all: protectedProcedure.query(async ({ ctx }) => {
        // prismaで作成されたtodoを作成順に取得
        // 取得するデータはid, text, status, timeだけ
        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return todos.map(({ id, text, status, time }) => ({
            id,
            text,
            status,
            time
        }));
    }),
    // プロシージャの実行前にinputでzodによるバリデーションを実施
    // mutaionで更新処理を実行できる
    create: protectedProcedure.input(createInput).mutation(({ ctx, input }) => {
        const { text, time } = input;
        return ctx.prisma.todo.create({
            data: {
                text: text,
                time: time,
                user: {
                    connect: {
                        id: ctx.session.user.id,
                    },
                },
            },
        });
    }),
    // update
    changeStatus: protectedProcedure.input(changeStatusInput).mutation(({ ctx, input }) => {
        const { id, status } = input;
        return ctx.prisma.todo.update({
            where: { id },
            data: {
                status: status
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