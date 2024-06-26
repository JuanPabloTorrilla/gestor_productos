"use strict";
const electron = require("electron");
const path = require("node:path");
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win = null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    transparent: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    maxWidth: 1280,
    minWidth: 900,
    maxHeight: 730,
    minHeight: 650,
    frame: false,
    // Quita el marco de la ventana predeterminado de Electron
    titleBarStyle: "hidden",
    // Oculta la barra de título predeterminada de Electron
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
    const minimizeBtn = document.getElementById("minimize-btn");
    minimizeBtn.addEventListener("click", () => {
      win == null ? void 0 : win.minimize();
    });
    const closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener("click", () => {
      win == null ? void 0 : win.close();
    });
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(createWindow);
