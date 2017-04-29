const electron = require('electron')
const {ipcMain, app, BrowserWindow} = electron
const path = require('path')
const url = require('url')
const dialog = electron.dialog
var splashScreen;
var win;
var renderwin;
var filename;
function createWindow () {
    const {renderwidth, renderheight} = electron.screen.getPrimaryDisplay().workAreaSize/2
    renderwin = new BrowserWindow({height: renderheight, width: renderwidth, frame:false, show:false});

    renderwin.loadURL(url.format({
	pathname: path.join(__dirname, 'renderer.html'),
	protocol: 'file:',
	slashes: true
    }));
    renderwin.on('closed', () => {
	renderwin = null;
    });
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({width: width, height: height, show: true})
    win.loadURL(url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true
    }))
    win
    win.on('closed', () => {
	// Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
	if (renderwin) {
	    renderwin.close();
	}
	renderwin = null;
	win = null;
    })
}
function createSplash() {
    createWindow();
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize/2
    splashwin = new BrowserWindow({width:width, height:height, frame:false})
    splashwin.loadURL(url.format({
	pathname: path.join(__dirname, 'splash.html'),
	protocol: 'file:',
	slashes: true
    }))
    splashwin.on('closed', () => {
	splashwin = null
    })   
}

// inter-process communication
ipcMain.once('messageFromSplash', (event, arg) => {
    filename = arg[0];
    renderwin.show();
    splashwin.close();
    win.webContents.send('replyFromMain', filename);
    event.returnValue = true;
});
ipcMain.once('done with spg calculations', (event, arg) => {
    win.show();
    renderwin.close();
});
ipcMain.once('closeall', (event, arg) => {
    win.close();
    splashwin.close();
    win = null;
    splashwin = null;
    renderwin = null;
});
ipcMain.once('pointer', (event, arg) => {
    var arg = arg[0];
    renderwin.webContents.send('thispointer', arg);
});
app.on('ready', createSplash);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  //darwin == MacOS, and on mac it's common for programs to be quit using system tray
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
