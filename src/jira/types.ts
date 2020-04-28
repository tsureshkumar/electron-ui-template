export interface JiraConfig {
  url: string;
  user: string;
  configured: boolean;
}

// actions are messages in elm
export enum JIRA {
    UpdateConfig = "JIRA_UPDATE_CONFIG",
    ResetConfig = "JIRA_RESET_CONFIG",
}
export interface UpdateConfigMsg {
  "type": JIRA.UpdateConfig;
  config: JiraConfig;
}
export interface ResetConfigMsg  {
  "type": JIRA.ResetConfig;
}
export type actionsT = UpdateConfigMsg | ResetConfigMsg;
