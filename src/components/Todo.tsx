import { type ChangeEvent, useState } from "react";
import type { Todo } from "~/server/types";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

type TodoProps = {
    todo: Todo;
};

export function Todo({ todo }: TodoProps) {
    const { id, text, status } = todo;

    const [currentTodo, setCurrentTodo] = useState(text);
    const [currentStatus, setCurrentStatus] = useState(status);

    const trpc = api.useContext();

    const { mutate: deleteMutation } = api.todo.delete.useMutation({
        onMutate: async (deleteId) => {
            await trpc.todo.all.cancel();
            const previousTodos = trpc.todo.all.getData();
            trpc.todo.all.setData(undefined, (prev) => {
                if (!prev) return previousTodos;
                return prev.filter((t) => t.id !== deleteId);
            });
            return { previousTodos };
        },
        onError: (err, _, context) => {
            toast.error("An error occurred when deleting todo");
            console.error(err);
            if (!context) return;
            trpc.todo.all.setData(undefined, () => context.previousTodos);
        },
        onSettled: async () => {
            await trpc.todo.all.invalidate();
        },
    });

    const { mutate: updateMutation } = api.todo.update.useMutation({
        onMutate: async ({ id, text: currentTodo }) => {
            await trpc.todo.all.cancel();
            const previousTodos = trpc.todo.all.getData();
            trpc.todo.all.setData(undefined, (prev) => {
                if (!prev) return previousTodos;
                return prev.map((t) => {
                    if (t.id === id) {
                        return {
                            ...t,
                            text: currentTodo,
                        };
                    }
                    return t;
                });
            });
            setCurrentTodo(currentTodo);
            return { previousTodos };
        },
        onError: (err, _, context) => {
            toast.error("An error occured when editing todo");
            console.error(err);
            setCurrentTodo(text);
            if (!context) return;
            trpc.todo.all.setData(undefined, () => context.previousTodos);
        },
        onSettled: async () => {
            await trpc.todo.all.invalidate();
        },
    });

    const { mutate: changeStatusMutation } = api.todo.changeStatus.useMutation({
        onMutate: async ({ id, status }) => {
            await trpc.todo.all.cancel();
            const previousTodos = trpc.todo.all.getData();
            trpc.todo.all.setData(undefined, (prev) => {
                if (!prev) return previousTodos;
                return prev.map((t) => {
                    if (t.id === id) {
                        return {
                            ...t,
                            status: status
                        };
                    }
                    return t;
                });
            });
            setCurrentStatus(currentStatus);
            return { previousTodos };
        },
        onError: (err, _, context) => {
            toast.error("An error occured when editing status");
            console.error(err);
            setCurrentStatus(status);
            if (!context) return;
            trpc.todo.all.setData(undefined, () => context.previousTodos);
        },
        onSettled: async () => {
            await trpc.todo.all.invalidate();
        },
    });

    // as const オブジェクトのプロパティ全体をreadonly かつリテラル型として扱う
    const STATUS_LIST = {
        BACKLOG: 'BACKLOG',
        TODO: 'TODO',
        IN_PROGRESS: 'IN_PROGRESS',
        COMPLETED: 'COMPLETED'
    } as const;
    type STATUS_LIST = typeof STATUS_LIST[keyof typeof STATUS_LIST];

    const statusColor = () => {
        if (status === 'BACKLOG') {
            return 'bg-green-one'
        } else if (status === 'TODO') {
            return 'bg-green-two'
        } else if (status === 'IN_PROGRESS') {
            return 'bg-green-three'
        } else {
            return 'bg-green-four'
        }
    }

    return (
        <div className="flex items-center justify-between rounded-md border-2 border-gray-one px-5 py-4">
            <div className="flex w-full max-w-lg items-center justify-start">
                <input
                    className="ml-5 flex-1 text-ellipsis rounded-none border-x-0 border-t-0 border-b border-dashed border-b-gray-two bg-cream-four px-0 pb-1 text-base font-normal text-gray-three placeholder:text-gray-two focus:border-gray-three focus:outline-none focus:ring-0"
                    id={`${todo.id}-text`}
                    type="text"
                    placeholder="Enter a todo"
                    value={currentTodo}
                    onChange={(e) => {
                        setCurrentTodo(e.target.value);
                    }}
                    // フィールドへのフォーカスが外れた時にupdateMutationが実行
                    onBlur={(e) => {
                        updateMutation({ id, text: e.target.value });
                    }}
                />
                <select
                    className={`${statusColor()} ml-5 hidden rounded-full  py-0.5 px-2 text-sm font-normal text-gray-five md:block`}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => changeStatusMutation({ id, status: e.target.value as STATUS_LIST })}
                    value={status}
                >
                    {Object.values(STATUS_LIST).map((value, i) => <option key={i}>{value}</option>)}
                </select>
            </div>
            <button
                type="button"
                className="group ml-4 flex items-center justify-center rounded-md bg-cream-four p-2 hover:bg-steel-one focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-five"
                onClick={() => deleteMutation(id)}
            >
                <svg
                    className="h-5 w-5 text-steel-three group-hover:text-gray-five"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_35_392)">
                        <path
                            d="M24 6.4H32V9.6H28.8V30.4C28.8 30.8244 28.6314 31.2313 28.3314 31.5314C28.0313 31.8314 27.6243 32 27.2 32H4.8C4.37565 32 3.96869 31.8314 3.66863 31.5314C3.36857 31.2313 3.2 30.8244 3.2 30.4V9.6H0V6.4H8V1.6C8 1.17565 8.16857 0.768688 8.46863 0.468629C8.76869 0.168571 9.17565 0 9.6 0H22.4C22.8243 0 23.2313 0.168571 23.5314 0.468629C23.8314 0.768688 24 1.17565 24 1.6V6.4ZM25.6 9.6H6.4V28.8H25.6V9.6ZM18.2624 19.2L21.0912 22.0288L18.8288 24.2912L16 21.4624L13.1712 24.2912L10.9088 22.0288L13.7376 19.2L10.9088 16.3712L13.1712 14.1088L16 16.9376L18.8288 14.1088L21.0912 16.3712L18.2624 19.2ZM11.2 3.2V6.4H20.8V3.2H11.2Z"
                            fill="currentColor"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_35_392">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
}