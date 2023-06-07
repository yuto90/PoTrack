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
        return 'text-high-tomato'
    }
}

// 時間をhh:mm:ss形式に変換
export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
