import { createStore } from "zustand";
import { type Base64 } from "../types/basic";

export type Store = {
  photo: Base64;
};

export type StoreActions = {
  save: () => void;
  remove: () => void;
};

export type AppStore = Store & StoreActions;

const defaultStore: Store = {
  photo: "",
};

const createAppStore = (initState: Store = defaultStore) => {
  return createStore<AppStore>((set) => ({
    ...initState,
    save: () => set((state) => {
      // localStorage.setItem('photo', state.photo);
      return state;
    }),
    remove: () => set((state) => {
      // localStorage.removeItem('photo');
      return state;
    }),
  }))
};

export { defaultStore, createAppStore };

