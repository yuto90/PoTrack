// as const オブジェクトのプロパティ全体をreadonly かつリテラル型として扱う
export const STATUS_LIST = {
    BACKLOG: 'BACKLOG',
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED'
} as const;
export type STATUS_LIST = typeof STATUS_LIST[keyof typeof STATUS_LIST];

export const statusColor = (status: STATUS_LIST) => {
    if (status === 'BACKLOG') {
        return 'text-high-blue'
    } else if (status === 'TODO') {
        return 'text-high-orange'
    } else if (status === 'IN_PROGRESS') {
        return 'text-high-pink'
    } else {
        return 'text-high-red'
    }
}
