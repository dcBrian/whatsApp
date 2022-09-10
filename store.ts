import create from 'zustand';

export type Store = {
    status: boolean;
    setFalse: () => void;
    setTrue: () => void;
};

export const useSidebarStore = create<Store>((set) => ({
    status: false,
    setFalse: () => set({ status: false }),
    setTrue: () => set({ status: true }),
}));
