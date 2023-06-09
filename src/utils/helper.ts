import { type STATUS_LIST } from "~/type/statusList"

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
export const convertTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const decodeTime = (convertTime: string) => {
    const [hours, minutes, seconds] = convertTime.split(':');
    return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
}