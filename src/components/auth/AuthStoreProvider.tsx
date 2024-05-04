import { createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";
import {
  AuthState,
  TAuthStore,
  createAuthStore,
} from "../../common/stores/authStore";

export const AuthStoreContext = createContext<StoreApi<TAuthStore> | null>(
  null
);

export interface AuthStoreProviderProps {
  children: React.ReactNode;
  init: AuthState;
}

export const AuthStoreProviders = ({
  children,
  init,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TAuthStore>>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore(init);
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: TAuthStore) => T): T => {
  const counterStoreContext = useContext(AuthStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
