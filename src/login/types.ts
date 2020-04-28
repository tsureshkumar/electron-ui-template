export interface User {
  userName: string;
  password: string;
}

export interface LoginState {
  authenticated: boolean;
  authenticating: boolean;
  user: User;
  error?: string;
}

export enum Login {
    Trying =  "LOGIN_TRYING",
    Success = "LOGIN_SUCCESS",
    Failed = "LOGIN_FAILED"
}

export interface LoginTryMsg {
  type: Login.Trying;
  username: string;
  password: string;
}

export interface LoginSuccessMsg {
  type: Login.Success;
  user: User;
}

export interface LoginFailedMsg {
  type: Login.Failed;
  error: string;
}

export type LoginMsg = LoginTryMsg | LoginSuccessMsg | LoginFailedMsg;
