const electron = require("electron");
const path = require("path");
const fs = require("fs");

class SessionStore {
  BaseURL: string;
  ses: any;
  constructor(opts) {
        // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
        // app.getPath('userData') will return a string of the user's app data directory path.
    const session = electron.session || electron.remote.session;
    this.ses = session.fromPartition("persist:name");
    this.ses = session.defaultSession;
    this.BaseURL = opts.BaseURL;
  }
  storeSession(name, data) {
    const expiration = new Date();
    let hour = expiration.getHours();
    hour = hour + 6;
    expiration.setHours(hour);
    this.ses.cookies.set(
      {
        url: this.BaseURL,
        name,
        value: data,
        session: true,
        expirationDate: expiration.getTime()
      },
            function(error) {
              console.log(error);
            }
        );
  }

  async getSession(name) {
    return this.ses.cookies.get({ url: this.BaseURL, name }).then(x => {
      return x && x.length >= 0 ?  x[0].value : {}; });
  }
}

const getUrl = window.location;
const baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
export const session = new SessionStore({ BaseURL: baseUrl });
