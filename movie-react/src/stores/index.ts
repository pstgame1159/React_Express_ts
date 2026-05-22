import { createContext, useContext } from 'react';
import { RootStore, IRootStore } from './RootStore';

export const store = RootStore.create({});

export const StoreContext = createContext<IRootStore>(store);

export const useStore = (): IRootStore => useContext(StoreContext);
export const useAuthStore = () => useContext(StoreContext).auth;
