import { LoginState } from "./types";
// translates state before persisting
// should do the reverse translation during store init
export function auth(st: LoginState, store = true): LoginState {
  return undefined; // do not persist
//  return st;
}
