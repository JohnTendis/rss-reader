import { app, BrowserWindow, ipcMain, session, shell } from "electron";

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: "#191622",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
    },
  });

  // Developer tools ON
  // TODO: Hide on product
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open links [target="_blank"] or if there is [<base target="_blank" />] in external browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // config.fileProtocol is my custom file protocol
    // if (url.startsWith(config.fileProtocol)) {
    //     return { action: 'allow' };
    // }
    // open url in a browser and prevent default
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on("message", (_, message) => {
    console.log(message);
  });
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(() => {
    ///CSP
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "connect-src 'self' http://localhost:3000/ https://randomuser.me/ https://www.reddit.com/",
          ],
        },
      });
    });

    ///CORS
    // const filter = {
    //   urls: ["*"],
    // };
    // session.defaultSession.webRequest.onBeforeSendHeaders(
    //   filter,
    //   (details, callback) => {
    //     details.requestHeaders["Origin"] = null;
    //     callback({ requestHeaders: details.requestHeaders });
    //   }
    // );
  })
  .then(registerListeners)
  .catch((e) => console.error(e));

// Disable CORS
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
