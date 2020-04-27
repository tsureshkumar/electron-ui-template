import * as React from "react";
import { combineReducers } from "redux";


interface LoginState {
  user: string;
  password: string;
  authenticated: boolean;
}

const initialState: LoginState = {
  user: "username",
  password: "password",
  authenticated: false,
};

// reducers are aka update in elm
export function loginReducer(state: any = initialState, action: any): any {
  return state;
}
