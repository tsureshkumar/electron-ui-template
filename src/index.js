import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { myCreateStore } from "./mystore";
import "typeface-roboto";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#fff",
            main: "#76bd8e",
            dark: "#000"
        },
        secondary: {
            main: "#f44336"
        }
    }
});

const store = myCreateStore();

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
