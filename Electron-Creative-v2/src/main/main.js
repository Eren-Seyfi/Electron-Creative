// main.js
const { app, shell, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { electronApp, optimizer } = require("@electron-toolkit/utils");
const { HomeWindow } = require("./windows");

app.whenReady().then(async () => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  HomeWindow(BrowserWindow, shell, path, ipcMain);

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0)
      HomeWindow(BrowserWindow, shell, path);
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
