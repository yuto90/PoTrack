import { useState } from "react";
import toast from "react-hot-toast";
import { createInput } from "~/server/types";
import type { Todo } from "~/server/types";
import { api } from "~/utils/api";
import { MolInputText } from "../molecules/MolInputText";
import { OrgStopWatch } from "../molecules/OrgStopWatch";

export function OrgCreateTodo() {
    const [newTodo, setNewTodo] = useState("");

    // フロントエンドにキャッシュされているtodoデータを書き換える用にキャッシュへのアクセスできるフックを用意
    const trpc = api.useContext();
    // サーバー側で定義したcreateメソッドを呼び出してる
    // useMutation:データを変更する操作（POST、PATCH、DELETE等）を行うために使用
    const { mutate } = api.todo.create.useMutation({
        // mutation が実行される前に発火する関数
        onMutate: async (newTodo) => {
            const { text, time } = newTodo;

            await trpc.todo.all.cancel();
            const previousTodos = trpc.todo.all.getData();
            trpc.todo.all.setData(undefined, (prev) => {
                const optimisticTodo: Todo = {
                    id: "optimistic-todo-id",
                    text: text,
                    time: time,
                    status: 'BACKLOG'
                };
                if (!prev) return [optimisticTodo];
                return [optimisticTodo, ...prev];
            });
            setNewTodo("");
            return { previousTodos };
        },
        onError: (err, newTodo, context) => {
            const { text } = newTodo;
            toast.error("An error occurred when creating todo");
            console.error(err);
            setNewTodo(text);
            if (!context) return;
            trpc.todo.all.setData(undefined, () => context.previousTodos);
        },
        // onSettled クエリ or ミューテーションが成功したかどうかに関わらず呼ばれる
        onSettled: async () => {
            await trpc.todo.all.invalidate();
        },
    });

    const createTodo = () => {
        // ローカルストレージに保存されている時間情報を取得
        const time = Number(localStorage.getItem('time'));

        // createInputはzodで作成したバリデーションのスキーマ
        // クライアント側でもzodのバリデーションを流用できる。
        const input = { text: newTodo, time: time };

        // .safeParseｒで引数に渡されてる値を検証できる
        const result = createInput.safeParse(input);

        // バリデーションに失敗したらZotErrorオブジェクトのエラー配列を結合してトーストに表示
        if (!result.success) {
            toast.error(result.error.format()._errors.join("\n"));
            return;
        }

        mutate(input)
    }

    // input内の値が変化した時useStateの更新用関数で変数を更新
    const overwriteTodo = (targetValue: string) => {
        setNewTodo(targetValue)
    };

    return (
        <div className="gap-3 w-auto md:w-9/12">
            <MolInputText
                btnText="Create"
                inputValue={newTodo}
                inputPlaceholder="New Todo..."
                onChange={overwriteTodo}
                onSubmit={createTodo}
            />
        </div>
    );
}