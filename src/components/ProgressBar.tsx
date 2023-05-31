import type { Todo } from "~/server/types";

type ProgressBarProps = {
    todos: Todo[];
};

export function ProgressBar({ todos }: ProgressBarProps) {
    const totalCount = todos.length;
    const backlogCount = todos.filter((todo) => todo.status === 'BACKLOG').length;
    const progressCount = todos.filter((todo) => todo.status === 'IN_PROGRESS').length;
    const todoCount = todos.filter((todo) => todo.status === 'TODO').length;
    const completedCount = todos.filter((todo) => todo.status === 'COMPLETED').length;

    const backlogPercentage =
        Math.round((backlogCount / totalCount) * 100) || 0;
    const progressPercentage =
        Math.round((progressCount / totalCount) * 100) || 0;
    const todoPercentage =
        Math.round((todoCount / totalCount) * 100) || 0;
    const completedPercentage =
        Math.round((completedCount / totalCount) * 100) || 0;

    return (
        <section className="mt-10">
            <h3 className="text-xl font-bold text-gray-three">Progress</h3>
            <div className="mt-8 space-y-8">
                <div>
                    <div className="flex justify-between text-base font-normal text-gray-three">
                        <p>Backlog</p>
                        <p>{backlogPercentage}%</p>
                    </div>
                    <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-one">
                        <div
                            className="h-4 rounded-full bg-green-two transition-all duration-500 ease-out"
                            style={{ width: `${backlogPercentage}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-base font-normal text-gray-three">
                        <p>Todo</p>
                        <p>{todoPercentage}%</p>
                    </div>
                    <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-one">
                        <div
                            className="h-4 rounded-full bg-green-three transition-all duration-500 ease-out"
                            style={{ width: `${todoPercentage}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-base font-normal text-gray-three">
                        <p>In Progress</p>
                        <p>{progressPercentage}%</p>
                    </div>
                    <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-one">
                        <div
                            className="h-4 rounded-full bg-green-four transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-base font-normal text-gray-three">
                        <p>Completed</p>
                        <p>{completedPercentage}%</p>
                    </div>
                    <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-one">
                        <div
                            className="h-4 rounded-full bg-green-five transition-all duration-500 ease-out"
                            style={{ width: `${completedPercentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}