import { api } from "~/utils/api";
import { OrgTodo } from "~/components/organisms/Todo";
import { OrgProgressBar } from "~/components/organisms/OrgProgressBar";

export function OrgTodos() {
    const { data: todos, isLoading, isError } = api.todo.all.useQuery();

    if (isLoading)
        return (
            <div className="flex items-center justify-center">
                <div
                    style={{ borderTopColor: "transparent" }}
                    className="text-high-green border-blue-200 mt-32 h-10 w-10 animate-spin rounded-full border-4"
                />
                <p className="text-high-green mt-32 ml-4 text-xl">loading...</p>
            </div>
        );
    if (isError)
        return (
            <div className="flex items-center justify-center">
                <p className="text-high-green mt-10 ml-4 text-xl">Error fetching todos</p>
            </div>
        );

    return (
        <>
            {todos.map((todo) => {
                return (
                    <section key={todo.id} className="mt-8 space-y-4">
                        <OrgTodo todo={todo} />
                    </section>
                );
            })}
            <OrgProgressBar todos={todos} />
        </>
    );
}