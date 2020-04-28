import * as React from "react";
import { useState, useCallback, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, loginTrying, loginSuccess, loginFailed } from "./actions";
import { LoginState, User } from "./types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Input, InputLabel, FormControl } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";


import { getUser } from "./user";
import { client as jiraClient } from "../jira-client";
import { JiraConfig, getConfig } from "../jira";

const useStyles = makeStyles(theme => ({
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
    width: "50ch"
  },
  config: {
    alignSelf: "center"
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

interface LoginFormProp {
  username: String;
  onLogin: (username, password) => void;
}

const LoginForm: FunctionComponent<LoginFormProp> = ({ username, onLogin }) => {
  const classes = useStyles();
  const [stusername, updateUserName] = useState(username);
  const [stpasswd, updatePassword] = useState("");
    // const [errors, updateErrors] = useState({ user: false,  url: true, });

  const validate = () => {
    return {
      user: stusername.length === 0,
      pwd: stpasswd.length === 0
    };
  };
  const errors = validate();
  const enabled = !Object.keys(errors).some(x => errors[x]);
  return (
        <FormControl>
            <TextField
                id="username"
                className={classes.textField}
                error={errors.user}
                placeholder="username"
                fullWidth
                value={stusername}
                onChange={e => updateUserName(e.target.value)}
            />
            <Input
                id="pwd"
                type="password"
                error={errors.pwd}
                placeholder="password"
                value={stpasswd}
                onChange={e => updatePassword(e.target.value)}
            />
            <Button disabled={!enabled} onClick={e => onLogin(stusername, stpasswd)}>
                Login
            </Button>
        </FormControl>
  );
};

export const LoginComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const config: JiraConfig = getConfig();
  const authenticated = useSelector(st => st.auth);
  const dispatch = useDispatch();
  const updateUser = useCallback(
        (username: string, password: string) => {
          dispatch(login(config.url, username, password));
        },
        [dispatch]
    );
  return (
        <div className={classes.config}>
            {authenticated && authenticated.error && <Alert severity="error">{authenticated.error}</Alert>}
            <LoginForm username={config?.user} onLogin={updateUser} />
        </div>
  );
};
