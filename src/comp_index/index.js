const electron = require('electron');
const path = require('path')

const remote = electron.remote;
const dialog = remote.dialog;
const ipc = electron.ipcRenderer;
const { BrowserWindow } = remote;

const closeBtn = window.document.getElementById("close-btn");
closeBtn.addEventListener('click', () => {
    const allWindows = BrowserWindow.getAllWindows()
    dialog.showMessageBox(remote.getCurrentWindow(), {
        type: "question",
        defaultId: 0,
        buttons: ['Cancel', 'Yes'],
        title: "Confirmation Dialog",
        message: "Are you sure you want to close this application?"
    }).then(response => {
        if (response.response === 1) allWindows.forEach(i => i.close())
    }).catch(err => {

    })
})

const title = document.getElementById("input-title");

const inputBtn = document.getElementById("input-btn");
inputBtn.addEventListener('click', () => {
    let window = new BrowserWindow({
        width: 400,
        height: 200,
        // alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const modalPath = path.join(__dirname, "..", "comp_input", "changeTitle.html")
    window.loadFile(modalPath);
    window.on('close', () => window = null);
    window.setMenu(null)
    // window.webContents.openDevTools()
    // window.show()
})

ipc.on('target-input-title', (_, arg) => {
    title.innerHTML = arg
})