function createWindow(BrowserWindow, shell, path) {
  const loadWindow = new BrowserWindow({
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

  setTimeout(() => {
    loadWindow.close()

    loadWindow.on('close', () => {})
  }, 6000)

  loadWindow.setResizable(false)
  loadWindow.on('ready-to-show', () => {
    loadWindow.show()
  })

  loadWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  loadWindow.webContents.openDevTools()
  loadWindow.loadFile(path.join(__dirname, '../../renderer/pages/load.html'))

  return loadWindow
}
module.exports = createWindow
