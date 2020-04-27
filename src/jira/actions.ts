import { UpdateConfigMsg, JiraConfig, actionsT, JIRA } from "./types";

// helper functions for constructing Msgs actionT
export const sendUpdateConfig = (config: JiraConfig)  => ({ type: JIRA.UpdateConfig, config });
export const sendResetConfig = ()  => ({ type: JIRA.ResetConfig });
