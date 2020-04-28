import { client } from "../jira-client";
import { session } from "../electronSession";
import { LoginState } from "./types";
import { login, loginSuccess } from "./actions";

export function auth() {
  return {
    key: "jira-client-config-updater",
    listen: st => {
      if (!st || !st.auth) return;
      const login: LoginState = st.auth;
      if (login && login.user) {
        client.setAuth(login.user.userName, login.user.password);
      }
    }
  };
}

export async function onSessionLoad(store) {
  const sess = await session.getSession("auth");
  if (!sess) return;
  const auth: LoginState = JSON.parse(sess);
  const state = store.getState();
  if (state && state.jira && state.jira.url && auth && auth.user && auth.user.userName && auth.user.password) {
    // store.dispatch(loginSuccess({ userName: auth.user.userName, password: auth.user.password }));
    store.dispatch(login(state.jira.url, auth.user.userName, auth.user.password));
  }
}
