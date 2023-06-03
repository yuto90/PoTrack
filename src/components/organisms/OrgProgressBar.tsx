import type { Todo } from "~/server/types";
import { type STATUS_LIST, statusColor } from "~/utils/helper";

type ProgressBarProps = {
    todos: Todo[];
};

export function OrgProgressBar({ todos }: ProgressBarProps) {
    const totalCount = todos.length;
    const backlogCount = todos.filter((todo) => todo.status === 'BACKLOG').length;
    const inProgressCount = todos.filter((todo) => todo.status === 'IN_PROGRESS').length;
    const todoCount = todos.filter((todo) => todo.status === 'TODO').length;
    const completedCount = todos.filter((todo) => todo.status === 'COMPLETED').length;

    const backlogPercentage =
        Math.round((backlogCount / totalCount) * 100) || 0;
    const inProgressPercentage =
        Math.round((inProgressCount / totalCount) * 100) || 0;
    const todoPercentage =
        Math.round((todoCount / totalCount) * 100) || 0;
    const completedPercentage =
        Math.round((completedCount / totalCount) * 100) || 0;

    const progressData = {
        'backlog': { title: 'BACKLOG', progress: backlogPercentage },
        'todo': { title: 'TODO', progress: todoPercentage },
        'inProgress': { title: 'IN_PROGRESS', progress: inProgressPercentage },
        'completed': { title: 'COMPLETED', progress: completedPercentage }
    };

    type progressDataKey = keyof typeof progressData;

    return (
        <section className="mt-10">
            <h3 className="text-xl font-bold text-high-green">Progress</h3>
            <div className="mt-8 space-y-8">
                {(Object.keys(progressData) as progressDataKey[]).map((key, index) => {
                    return (
                        <div key={index}>
                            <div className="flex justify-between text-base font-normal">
                                <p className={`${statusColor(progressData[key]['title'] as STATUS_LIST)}`}>{progressData[key]['title']}</p>
                                <p className={`${statusColor(progressData[key]['title'] as STATUS_LIST)}`}>{progressData[key]['progress']}%</p>
                            </div>
                            <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-three">
                                <div
                                    className="h-4 rounded-full bg-high-green transition-all duration-500 ease-out"
                                    style={{ width: `${progressData[key]['progress']}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}