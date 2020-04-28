import * as React from "react";
import { combineReducers } from "redux";
import { LoginState, Login, LoginMsg } from "./types";

const initialState: LoginState = {
  authenticated: false,
  authenticating: false,
  user: undefined,
  error: undefined,
};

// reducers are aka update in elm
export function auth(state: LoginState = initialState, action: LoginMsg): LoginState {
  switch (action.type) {
  case Login.Trying:
    return { ...state, authenticated: false, authenticating: true };
  case Login.Success:
    return { ...state, user: action.user, authenticated: true, authenticating: false };
  case Login.Failed:
    return { ...state, ...initialState, error: action.error };
  }
  return state;
}
