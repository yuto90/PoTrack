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

// todo作成時にユーザーから入力される値のバリデーション
export const createInput = z.object({
    // 入力されたtodo
    text: z
        .string()
        .min(1, "1文字以上で入力してください")
        .max(50, "50文字以下で入力してください"),
    // ストップウォッチの値
    time: z.number()
})


export const updateInput = z.object({
    id: z.string(),
    text: z
        .string()
        .min(1, "1文字以上で入力してください")
        .max(50, "50文字以下で入力してください")
});

// ステータス変更プルダウンは特定文字列のみを許可
export const changeStatusInput = z.object({
    id: z.string(),
    status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "COMPLETED"])
});
