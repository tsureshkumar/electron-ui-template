import { JiraConfig } from "./types";
// translates state before persisting
// should do the reverse translation during store init
export function jira(st: JiraConfig, store = true): JiraConfig {
  // return { ...st, password: null };
  return st;
}
