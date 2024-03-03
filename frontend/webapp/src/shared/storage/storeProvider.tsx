"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type AppStore, defaultStore, createAppStore } from "./storage";

export const StoreContext = createContext<StoreApi<AppStore> | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi<AppStore>>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(defaultStore);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const AppStoreContext = useContext(StoreContext);

  if (!AppStoreContext) {
    throw new Error(`AppStoreContext must be use within AppStoreProvider`);
  }

  return useStore(AppStoreContext, selector);
};
