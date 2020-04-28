import { combineReducers } from "redux";
import { UpdateConfigMsg, JiraConfig, actionsT, JIRA } from "./types";
import { sendUpdateConfig, sendResetConfig } from "./actions";

const initialState: JiraConfig = {
  url: "jira.com",
  user: "username",
  configured: false,
};




// reducers are aka update in elm
// globally we are using combineReducer, it aadds objects with key as this function name automatically. For example, this state is stored in global state under key 'jira'
export function jira(state: JiraConfig = initialState, action: actionsT): JiraConfig {
  switch (action.type) {
  case JIRA.UpdateConfig:
    return { ...state, ...(action as UpdateConfigMsg).config, configured: true };
    break;
  case JIRA.ResetConfig:
    return { ...state, ...initialState };
    break;
  }
  return state;
}
