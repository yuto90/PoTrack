import { z } from "zod";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

// API の型定義である AppRouter の出力の型を推論するためのヘルパータイプ 
type RouterOutput = inferRouterOutputs<AppRouter>;
// Todo を全件取得するルーターの出力の型を定義 
// ["todo"] の todo は、src/server/api/root.ts で定義した createTRPCRouter で指定したキー
// ["all"] の all は、src/server/api/routers/todo.ts で定義したプロシージャの名前
type allTodosOutput = RouterOutput["todo"]["all"];
export type Todo = allTodosOutput[number];

// zodによるバリデーションの定義
export const createInput = z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(50, "todo must be 50 letters or less");

export const updateInput = z.object({
    id: z.string(),
    text: z
        .string()
        .min(1, "todo must be at least 1 letter")
        .max(50, "todo must be 50 letters or less"),
});

export const toggleInput = z.object({
    id: z.string(),
    is_completed: z.boolean(),
});