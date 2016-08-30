const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

const powerSaveBlocker = electron.powerSaveBlocker
powerSaveBlocker.start('prevent-display-sleep')

let win;

function createWindow() {
  let displays = electron.screen.getAllDisplays();
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  if (externalDisplay) {
    win = new BrowserWindow({ 
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      fullscreen: true
    });
  } else {
    win = new BrowserWindow({fullscreen: true});
  }

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null;
  });  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});