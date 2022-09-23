import React, { createContext, useContext, useMemo, useReducer } from "react";
import { rootReducer } from "~/store/reducer";

export interface ModalState {
  open: boolean;
  content: JSX.Element;
}

export interface AppState {
  modal: ModalState;
}

const initialState: AppState = {
  modal: {
    open: false,
    content: <></>,
  },
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export function useReducerState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useReducerState must be used within an AppProvider");
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider
      value={{ state: store.state, dispatch: store.dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
}
