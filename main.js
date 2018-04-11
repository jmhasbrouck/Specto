const electron = require('electron')
const { ipcMain, app, BrowserWindow } = electron
const path = require('path')
const url = require('url')
const dialog = electron.dialog
const Menu = electron.Menu;
var splashwin;
var win;
var renderwin;
var filename;
function createWindow() {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

    win = new BrowserWindow({ frame: true, width: width, height: height, show: false })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    //win.webContents.openDevTools();
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
        if (renderwin) {
            renderwin.close();
        }
        renderwin = null;
        win = null;
    })
    const { renderwidth, renderheight } = electron.screen.getPrimaryDisplay().workAreaSize / 2
    renderwin = new BrowserWindow({ frame: false, show: false });

    renderwin.loadURL(url.format({
        pathname: path.join(__dirname, 'renderer.html'),
        protocol: 'file:',
        slashes: true
    }));
    renderwin.on('closed', () => {
        renderwin = null;
    });
}
function createSplash() {
    // set the menu
    const menuTemplate = [
        {
            submenu: [
                {

                    label: 'Force Quit',
                    role: "quit"
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    //Menu.setApplicationMenu(menu);

    createWindow();
    if (!splashwin) {
        const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize / 2
        splashwin = new BrowserWindow({ width: width, height: height, frame: false, webPreferences: { webgl: true } })
        splashwin.loadURL(url.format({
            pathname: path.join(__dirname, 'splash.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
    else {
        splashwin.show();
    }
    //    splashwin.webContents.openDevTools();
    splashwin.on('closed', () => {
        splashwin = null
    })
}

// inter-process communication
ipcMain.on('messageFromSplash', (event, arg) => {
    filename = arg[0];
    console.log(filename);
    renderwin.show();
    splashwin.hide();
    renderwin.webContents.send('filename', filename);
    win.webContents.send('replyFromMain', filename);
    event.returnValue = true;
});
ipcMain.on('done with spg calculations', (event, arg) => {
    if (process.platform == 'darwin') {
        //win.maximize();
    }
    //    win.setFullScreen(true);

    if (splashwin) {
        splashwin.destroy();
    }
    if (renderwin) {
        renderwin.destroy();
    }
    console.log("done with spg");
    win.show();
});
ipcMain.on('closeall', (event, arg) => {
    if (win) {
        win.close();
    }
    if (splashwin) {
        splashwin.destroy();
    }
    win = null;
    splashwin = null;
    renderwin = null;
    app.quit();
});
ipcMain.on('restart app', (event, arg) => {
    win.destroy();
    createSplash();
});
app.on('ready', createSplash);

// Quit when all windows are closed.
app.on('window-all-closed', () => {

})
app.commandLine.appendSwitch('ignore-gpu-blacklist');
