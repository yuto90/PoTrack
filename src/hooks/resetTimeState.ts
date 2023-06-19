import { create } from 'zustand';

interface ResetTimeState {
    resetFlg: boolean;
    toggleResetFlg: () => void;
}

// ストップウォッチを別ファイルから初期化する用のHooks
export const useResetTimeState = create<ResetTimeState>((set) => ({
    resetFlg: false,
    toggleResetFlg: () => set((state) => ({ resetFlg: !state.resetFlg })),
}));
