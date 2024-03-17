// Modules
const { app, BrowserWindow } = require("electron");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      // show: false,
      backgroundColor: '#2b2e3b'
    },
  });

  mainWindow.loadFile("index.html");
  // mainWindow.loadURL('https://www.baidu.com/')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // listen events..
  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  // }); // or
  // mainWindow.once('ready-to-show', mainWindow.show);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
