import USER from './user';
import { messageStorage, messageContainer } from "./messageStorage";
import Scroller from './scroller';

const socket = io();

const form = document.forms.inputForm;
let messageInput = form.elements.input;

form.addEventListener("submit", sendMessage);
messageInput.onkeyup = detectCtrlEnter;

document.addEventListener("DOMContentLoaded", () => {
    reconnectFromStorage();
});

document.documentElement.setAttribute('class',
    'ontouchend' in document ? 'touch' : 'no-touch');

function isEmptyFilled(string) {
    let pattern = /^\s*$/;
    return !string || pattern.test(string);
}

// Tries to connect by data from sessionStorage, otherwise prompt username
function reconnectFromStorage() {
    let username = sessionStorage.username;
    let id = sessionStorage.id;
    if (id && username) {
        socket.emit("add user", {
            username: username,
            id: id
        });
    }
    else {
        connectByUsername();
    }
}

// Gets username and connects
function connectByUsername() {
    let name = getUsername();
    socket.emit("add user", {
        username: name
    });
}

// Promts username while it's empty
function getUsername() {
    let pickedName;
    while (isEmptyFilled(pickedName)) {
        pickedName = prompt("Pick username");
    }
    return pickedName;
}

function sendMessage(e) {
    e.preventDefault();

    let text = messageInput.value;
    if (!isEmptyFilled(text)) {
        let date = Date.now();
        let message = {
            id: `${USER.id}:${date.toString().slice(-9)}`,
            sender: USER.username,
            senderId: USER.id,
            text: text,
            time: date
        }
        socket.emit("message", message);
        appendMessage(message, true);
        messageInput.value = "";
    }
}

// Creates Scroller and appends message to messageStorage
function appendMessage(message, self = false) {
    new Scroller(() => {
        messageStorage.new(message);
    }, self);
}

// Sends message on Ctrl+Enter
function detectCtrlEnter(e) {
    if (e.ctrlKey && e.code === "Enter") {
        sendMessage(e);
    }
}

socket.on("connect", () => {
    console.log("You're connected");
});

socket.on("connect_error", err => {
    console.log(`connect_error due to ${err.message}`);
});

socket.on("successfully added", userObj => {
    sessionStorage.setItem("username", userObj.username);
    sessionStorage.setItem("id", userObj.id);
    USER.set(userObj);
    messageStorage.load();
    console.log(`Username: ${USER.username}\nId: ${USER.id}`);
});

socket.on("can't add user", message => {
    message && alert(message);
    connectByUsername();
});

socket.on("message", appendMessage);