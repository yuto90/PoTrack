import { create } from 'zustand';
import { type STATUS_LIST } from '~/type/statusList';


interface ResetTimeStore {
    resetFlg: boolean;
    toggleResetFlg: () => void;
}

// ストップウォッチを別ファイルから初期化する用のHooks
export const useResetTimeStore = create<ResetTimeStore>((set) => ({
    resetFlg: false,
    toggleResetFlg: () => set((state) => ({ resetFlg: !state.resetFlg })),
}));

interface CurrentTodoStore {
    title: string
    status: STATUS_LIST
    time: string
}

export const useCurrentTodoStore = create<CurrentTodoStore>((set) => ({
    title: "",
    status: "BACKLOG",
    time: "",
}));
