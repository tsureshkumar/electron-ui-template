import * as React from "react";
import { useState, useCallback, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendUpdateConfig } from "./actions";
import { JiraConfig } from "./types";
import jiraConnector from "jira-connector";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Input, FormControl } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  textField: {
    width: "50ch",
  }
}));

/*
export const jira = new jiraConnector({
  host: "jira-stage.walmart.com",
  strictSSL: true, // One of optional parameters
  basic_auth: {
    username: "",
    password: ""
  }
});

export const MyIssues = () => {
  const [user, updateUser] = React.useState({});
  React.useEffect(() => {
    console.log("getting user details ");
    console.table("getting user details ");
    jira.user.getUser({ username: "" })
          .then(r => updateUser(r));
  });
  return (<div>MyIssues {user.emailAddress}</div>);
};
 */

interface ConfigT {
  config: JiraConfig;
  onConfigUpdate: (JiraConfig) => void;
}

const JiraConfigForm: FunctionComponent<ConfigT> = ({ config, onConfigUpdate }) => {
  const classes = useStyles();
  const [username, updateUserName] = useState(config.user);
  const [url, updateUrl] = useState(config.url.toString());
    // const [errors, updateErrors] = useState({ user: false,  url: true, });

  const validate = () => {
    let validUrl = true;
    try {
      new URL(url);
    } catch (e) {
      validUrl = false;
    }
    return {
      user: username.length === 0,
      url: !validUrl
    };
  };
  const errors = validate();
  const enabled = !Object.keys(errors).some(x => errors[x]);
  return (
        <FormControl>
            <TextField className={classes.textField} error={errors.url} label="jira url" placeholder={url.toString()} fullWidth value={url.toString()} onChange={e => updateUrl(e.target.value)} />
            <TextField error={errors.user} label="username"  placeholder={username} value={username} onChange={e => updateUserName(e.target.value)} />
            <Button
                disabled={!enabled}
                onClick={e => onConfigUpdate({ ...config, user: username, url: new URL(url) })}
            >Save</Button>
        </FormControl>
  );
};

export const JiraConfigComponent = () => {
  const history = useHistory();
  const jiraConfig: JiraConfig = useSelector(state => state.jira);
  const dispatch = useDispatch();
  const updateConfig = useCallback((config: JiraConfig) => {
      dispatch(sendUpdateConfig(config));
      history.push("/");
    }, [dispatch]);
  return (
        <div className="JiraConfig">
            <JiraConfigForm config={jiraConfig} onConfigUpdate={updateConfig} />
        </div>
  );
};

export const isConfigured = () => {
  const jiraConfig: JiraConfig = useSelector(state => state.jira);
  return jiraConfig.configured;
};
