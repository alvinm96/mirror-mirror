/**
 * Created by alvinm on 7/11/16.
 */
var electron = require('electron');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var window;

function createWindow() {
  window = new BrowserWindow({fullscreen: true, frame: false});

  window.loadURL(`file://${__dirname}/../index.html`);

  window.webContents.openDevTools();

  window.on('closed', function() {
    window = null;
  });
}

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);