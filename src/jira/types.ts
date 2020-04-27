export interface JiraConfig {
  url: URL;
  user: string;
  configured: boolean;
}


// actions are messages in elm
export enum JIRA {
    UpdateConfig,
    ResetConfig,
}
export interface UpdateConfigMsg {
  "type": JIRA.UpdateConfig;
  config: JiraConfig;
}
export interface ResetConfigMsg  {
  "type": JIRA.ResetConfig;
}
export type actionsT = UpdateConfigMsg | ResetConfigMsg;
