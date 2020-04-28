import { Login, User } from "./types";
import { client as jiraClient } from "../jira-client";

// helper functions for constructing Msgs actionT
export const loginTrying = (userName: string, password: string) => {
  return { type: Login.Trying, username: userName, password };
};
export const login = (url: string, userName: string, password: string) => {
  return function(dispatch) {
    dispatch(loginTrying(userName, password));
    return jiraClient
            .authenticate(url, userName, password)
            .then(user => dispatch(loginSuccess(<User>{ userName: user.username, password })))
            .catch(e => {
              console.log(e);
              let msg = "Unknown error";
              try {
                const err = JSON.parse(e);
                switch (err.statusCode) {
                  case 401:
                    msg = "Unauthorized";
                    break;
                  case 500:
                    msg = "Unauthorized";
                    break;
                  default:
                    msg = e.body;
                    break;
                  }
              } catch (e) {
                msg = e;
              }
              dispatch(loginFailed(msg));
            });
  };
};
export const loginSuccess = (user: User) => ({ type: Login.Success, user });
export const loginFailed = error => ({ type: Login.Failed, error });
