import { client } from "../jira-client";
import { UpdateConfigMsg, JiraConfig, actionsT, JIRA } from "./types";

export function jira() {
  console.log("subscribing...");
  return {
    key: "jira-client-config-updater",
    listen: st => {
        if (!st || !st.jira) return;
        const jira: JiraConfig = st.jira;
        client.setConfig(jira.url, jira.user);
      }
  };
}
