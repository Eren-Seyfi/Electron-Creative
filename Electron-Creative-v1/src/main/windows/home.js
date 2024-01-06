const createproject = require('../js/createproject')
function createWindow(BrowserWindow, shell, path, ipcMain) {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../../resources/icon.png')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../../preload/preload.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.join(__dirname, '../../renderer/pages/index.html'))
  ipcMain.on('Project:Data', (event, data) => {
    createproject(data)
  })
}
module.exports = createWindow
