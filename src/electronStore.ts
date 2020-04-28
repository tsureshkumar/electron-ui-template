const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Store {
  path: any;
  data: any;
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath("userData");
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + ".json");
    console.log("loading data from ", userDataPath, this.path);

    this.data = parseDataFile(this.path, opts.defaults) || {};
  }

  // This will just return the property on the `data` object
  get(key) {
    return this.data[key];
  }

  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

const key = "jiratron";
const store = new Store({ configName: key });
export const loadState = () => {
  try {
    const state = (store.get(key));
    if (state === null) return undefined;
    return JSON.parse(state);
  } catch (err) {
    console.log("cannot load persisted store");
    return undefined;
  }
};

function replacer(key, value) {
  switch (key) {
  case "password":
  case "pwd":
  case "passwd": return null;
  }
  return value;
}

export const storeState = (state) => {
  try {
    if (state !== undefined) {
      store.set(key, JSON.stringify(state, replacer));
    }
  } catch (err) {
    console.log("cannot store in persisted store: ", err);
  }
};

