import { createStore } from "zustand";

export type Store = {
  bears: number;
};

export type StoreActions = {
  increase: () => void;
  decrease: () => void;
};

export type AppStore = Store & StoreActions;

const defaultStore: Store = {
  bears: 0,
};

const createAppStore = (initState: Store = defaultStore) => {
  return createStore<AppStore>((set) => ({
    ...initState,
    increase: () => set((state) => ({ bears: state.bears + 1 })),
    decrease: () => set((state) => ({ bears: state.bears - 1 })),
  }));
};

export { defaultStore, createAppStore };
