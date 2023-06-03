import { useState } from "react";
import toast from "react-hot-toast";
import { createInput } from "~/server/types";
import type { Todo } from "~/server/types";
import { api } from "~/utils/api";

export function OrgCreateTodo() {
    const [newTodo, setNewTodo] = useState("");

    // フロントエンドにキャッシュされているtodoデータを書き換える用にキャッシュへのアクセスできるフックを用意
    const trpc = api.useContext();
    // サーバー側で定義したcreateメソッドを呼び出してる
    // useMutation:データを変更する操作（POST、PATCH、DELETE等）を行うために使用
    const { mutate } = api.todo.create.useMutation({
        // mutation が実行される前に発火する関数
        onMutate: async (newTodo) => {
            await trpc.todo.all.cancel();
            const previousTodos = trpc.todo.all.getData();
            trpc.todo.all.setData(undefined, (prev) => {
                const optimisticTodo: Todo = {
                    id: "optimistic-todo-id",
                    text: newTodo,
                    status: 'BACKLOG'
                };
                if (!prev) return [optimisticTodo];
                return [optimisticTodo, ...prev];
            });
            setNewTodo("");
            return { previousTodos };
        },
        onError: (err, newTodo, context) => {
            toast.error("An error occurred when creating todo");
            console.error(err);
            setNewTodo(newTodo);
            if (!context) return;
            trpc.todo.all.setData(undefined, () => context.previousTodos);
        },
        // onSettled クエリ or ミューテーションが成功したかどうかに関わらず呼ばれる
        onSettled: async () => {
            await trpc.todo.all.invalidate();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                //* createInputはzodで作成したバリデーションのスキーマ
                //* クライアント側でもzodのバリデーションを流用できる。
                //* .safeParseｒとすると引数に渡されてる値を検証できる
                const result = createInput.safeParse(newTodo);

                if (!result.success) {
                    toast.error(result.error.format()._errors.join("\n"));
                    return;
                }

                mutate(newTodo);
            }}
            className="flex justify-between gap-3 w-4/5"
        >
            <input
                className="bg-gray-three w-full appearance-none rounded border-gray-one py-2 px-3 leading-tight text-high-green"
                type="text"
                placeholder="New Todo..."
                name="new-todo"
                id="new-todo"
                value={newTodo}
                //* input内の値が変化した時useStateの更新用関数で変数を更新
                onChange={(e) => {
                    setNewTodo(e.target.value);
                }}
            />
            <div className="flex">
                <button className="group flex items-center rounded-md bg-gray-four hover:bg-high-green px-6 py-3 text-lg font-semibold text-high-green hover:text-gray-four outline outline-2 outline-offset-2 outline-high-green  focus-visible:text-green-five focus-visible:outline-green-five">
                    Create
                    <svg
                        className="ml-3 h-4 w-4 text-high-green group-hover:text-green-five group-focus-visible:text-green-five"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_35_391)">
                            <path
                                d="M14.4 14.4V8H17.6V14.4H24V17.6H17.6V24H14.4V17.6H8V14.4H14.4ZM16 32C7.1632 32 0 24.8368 0 16C0 7.1632 7.1632 0 16 0C24.8368 0 32 7.1632 32 16C32 24.8368 24.8368 32 16 32ZM16 28.8C19.3948 28.8 22.6505 27.4514 25.051 25.051C27.4514 22.6505 28.8 19.3948 28.8 16C28.8 12.6052 27.4514 9.3495 25.051 6.94903C22.6505 4.54857 19.3948 3.2 16 3.2C12.6052 3.2 9.3495 4.54857 6.94903 6.94903C4.54857 9.3495 3.2 12.6052 3.2 16C3.2 19.3948 4.54857 22.6505 6.94903 25.051C9.3495 27.4514 12.6052 28.8 16 28.8V28.8Z"
                                fill="currentColor"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_35_391">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </form>
    );
}