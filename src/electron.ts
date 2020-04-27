const url = require("url");
const { app, BrowserWindow } = require("electron");

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");

function createWindow() {
    // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

    // and load the index.html of the app.
    // win.loadFile("index.html");
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) win.loadFile("index.html");
  else {
    const indexPath = url.format({
      protocol: "http:",
      host: "localhost:4040",
      pathname: "index.html",
      slashes: true
    });
    win.loadURL(indexPath);
  }

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log("Error loading React DevTools: ", err));
    win.webContents.openDevTools();
  }
}

app.on("ready", createWindow);
