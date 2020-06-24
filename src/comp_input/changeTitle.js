const electron = require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;

const updateTitle = document.getElementById('update-btn');
const inputField = document.getElementById('add-title');

updateTitle.addEventListener('click', () => {
    if (inputField.value) {
        ipc.send('update-input-title', inputField.value)
    }
    else {
        alert("Empty title cannot be updated")
        return;
    }

    var currentWindow = remote.getCurrentWindow()
    currentWindow.webContents.openDevTools()
    currentWindow.close()
})