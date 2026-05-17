"use client";

import React, {
  createContext,
  useReducer,
  PropsWithChildren,
  Dispatch,
} from "react";

// Define the types

interface Action {
  type: string;
  payload?: any;
}

const initialState: any = {
  search: "",
  searchType: "woda",
  breadcrumbs: [],
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_TYPE":
      return {
        ...state,
        searchType: action.payload,
      };
    case "UPDATE_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "SET_ACTIVE_FILE":
      return {
        ...state,
        activeFile: action.payload,
      };
    case "CLEAR_FILE":
      return {
        ...state,
        activeFile: undefined,
      };
    default:
      return state;
  }
};

interface ContextProps {
  state: any;
  dispatch: Dispatch<Action>;
}

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null, // Initial placeholder function
});

const Provider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const ContextExplorer = { Context, Provider };
