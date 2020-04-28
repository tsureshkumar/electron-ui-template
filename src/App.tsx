import * as React from "react";
import { isConfigured, JiraConfigComponent } from "./jira";
import { Router, Route, Link, HashRouter, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { MiniDrawer } from "./components";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./app.scss";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Content = () => {
  const classes = useStyles();
  return (
        <div>
            <MiniDrawer>
                <div>
                    <Route path="/" component={() => <div> HOME </div>}></Route>
                </div>
            </MiniDrawer>
        </div>
  );
};

function App() {
  const configured = isConfigured();
  if (!configured) {
    return <JiraConfigComponent />;
  }
  return (
        <div className="App">
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
