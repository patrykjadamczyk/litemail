const CONFIG = require('../config');
const url = require('url');
const {app, BrowserWindow} = require('electron');

module.exports = class ElectronWindow {
    constructor() {
        app.on('ready', this.cast.bind(this));
        app.on('activate', this.activate.bind(this));
    }

    cast() {
        this.window = new BrowserWindow(CONFIG.window);
        this.window.loadURL(url.format({
            pathname: `${CONFIG.host}:${CONFIG.port}/index.html`,
            protocol: 'http:',
            slashes: true
        }))

        this.window.on('closed', this.closed.bind(this));
        this.window.webContents.openDevTools()
    }

    activate() {
        this.window || this.cast();
    }

    closed() {
        this.window = undefined;
    }
}
