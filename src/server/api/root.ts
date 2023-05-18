import { createTRPCRouter } from "~/server/api/trpc";
import { todoRouter } from "~/server/api/routers/todo";

/**
* This is the primary router for your server.
*
* All routers added in /api/routers should be manually added here.
*/
// APIの型定義をエクスポート
export const appRouter = createTRPCRouter({
  todo: todoRouter,
});

// export type definition of API
// この型定義(AppRouter)をクライアント側でインポート可能
export type AppRouter = typeof appRouter;