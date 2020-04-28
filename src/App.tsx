import * as React from "react";
import { isConfigured, JiraConfigComponent } from "./jira";
import { Router, Route, Link, HashRouter, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { MiniDrawer } from "./components";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { HotKeys, GlobalHotKeys } from "react-hotkeys";
import "./app.scss";

const useStyles = makeStyles(theme => ({
  root: {
      display: "flex",
      minHeight: "100vh",
      minWidth: "100vh",
      alignItems: "flex-start"
    },
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
    },
  toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
  content: {
      flex: 1,
      display: "flex"
    }
}));

const Content = () => {
  const classes = useStyles();
  const keyMap = {
      COMMAND_HELP: "command+/"
    };
  const keyHandlers = {
      COMMAND_HELP: () => alert("sub help")
    };
  return (
        <MiniDrawer>
            <HotKeys keyMap={keyMap} handlers={keyHandlers}>
                <div className={classes.content}>
                    <Route path="/" component={() => <div> HOME </div>}></Route>
                </div>
            </HotKeys>
        </MiniDrawer>
    );
};

function App() {
  const configured = isConfigured();
  if (!configured) {
      return <JiraConfigComponent />;
    }
  const keyMap = {
      COMMAND_HELP: "/"
    };
  const keyHandlers = {
      COMMAND_HELP: () => alert("help")
    };
  return (
        <div className="App">
            <GlobalHotKeys keyMap={keyMap} handlers={keyHandlers} />
            <HashRouter history={history}>
                <Switch>
                    <Route exact path="/login" component={() => <div>Login</div>} />
                    <Route exact path="/config" component={JiraConfigComponent}></Route>
                    <Route path="/" component={Content}></Route>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
