var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

var ipc = require('ipc');
var dialog = require('dialog');


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {


  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.loadUrl('http://localhost:3000');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  ipc.on('open-dir-dialog', function(event, arg) {
    var dirPath = dialog.showOpenDialog(mainWindow, { properties: [ 'openDirectory', 'multiSelections' ]})
    event.sender.send('open-dir-dialog-reply', dirPath);
  });
});