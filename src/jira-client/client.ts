import jiraConnector from "jira-connector";
import { store } from "../mystore";

function log(x) {
  return x;
}

export interface UserInfo {
  username: String;
  emailAddress: String;
}

class Jira {
  jira: any = undefined;
  host: string;
  username: string;
  password: string;

  config(host, username, pwd) {
    this.jira = new jiraConnector({
      host,
      strictSSL: true, // One of optional parameters
      basic_auth: {
        username,
        password: pwd
      }
    });
  }

  setConfig(host, username = "unknown") {
    console.log("updating host", host, username);
    this.host = host;
    this.username = username;
  }

  setAuth(username, password) {
    this.username = username;
    this.password = password;
  }

  configured() {
    return this.host && this.username && this.password;
  }

  getJira() {
    if (this.configured()) {
      if (this.jira == undefined) {
        this.config(this.host, this.username, this.password);
      }
      return this.jira;
    }
    return undefined;
  }

  authenticate(host: string, username: string, password: string): Promise<UserInfo> {
    const jira = new jiraConnector({
      host,
      strictSSL: true, // One of optional parameters
      basic_auth: {
        username,
        password
      }
    });
    console.log("fetching....");
    return jira.user
            .getUser({ username })
            .then(log)
            .then(user => <UserInfo>{ username: user.name, emailAddress: user.emailAddress });
  }
}

export const client = new Jira();
