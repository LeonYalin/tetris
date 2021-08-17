import React, { createContext, memo, PropsWithChildren, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { Action, appInitialState, AppState, reducer } from './reducers';

type DispatchActionType = (action: Action) => void;

export const DispatchContext = createContext({} as DispatchActionType);
export const StateContext = createContext<AppState>(appInitialState);

const StoreProvider: React.FC<PropsWithChildren<React.ReactNode>> = ({ children }) => {
  const [state, dispatch] = useImmerReducer<AppState, Action>(reducer, appInitialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default memo(StoreProvider);

export function useAppState() {
  return useContext(StateContext);
}
