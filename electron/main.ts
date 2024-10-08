import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path';
import {appExpress} from '../server/app';


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
appExpress.listen(appExpress.get('port'), () => console.log(`Server running on port ${appExpress.get('port')}`));
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    transparent: true,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 1024,
    height: 720,
    resizable: false,
    frame: false, // Quita el marco de la ventana predeterminado de Electron
    titleBarStyle: 'hidden', // Oculta la barra de título predeterminada de Electron
    webPreferences: {
      preload: path.join(__dirname, '../dist-electron/preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))

    
  }
}

ipcMain.on('minimize-window', () => {
  win?.minimize();
});

ipcMain.on('close-window', () => {
  win?.close();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


app.whenReady().then(createWindow)