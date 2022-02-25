// import { io } from "socket.io-client";
import { messageStorage, messageContainer } from "./messageStorage";

const socket = io();

let USERNAME;
let ID;
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

function reconnectFromStorage() {
    let username = sessionStorage.name;
    let id = sessionStorage.userId;
    if (id && username) {
        socket.emit("add user", {
            userId: id,
            name: username
        });
    }
    else {
        connectByUsername();
    }
}

function connectByUsername() {
    let name = getUsername();
    socket.emit("add user", {
        name: name
    });
}

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
            sender: USERNAME,
            senderId: ID,
            text: text,
            time: date
        }
        socket.emit("message", message);
        appendMessage(message, true);
        messageInput.value = "";
    }
}

function appendMessage(message, self = false) {
    scroll = createScroller(self);
    messageStorage.new(message);
    scroll();
}

function createScroller(self) {
    let scrlTop = Math.ceil(messageContainer.scrollTop);
    let height = messageContainer.clientHeight;
    let scrlHeight = messageContainer.scrollHeight;
    var shouldScroll = self || scrlHeight <= scrlTop + height;

    return function () {
        if (shouldScroll) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }
}

function detectCtrlEnter(e) {
    if (e.ctrlKey && e.code === "Enter") {
        sendMessage(e);
    }
}

socket.on("connect", () => {
    console.log("You're connected");
});

socket.on("successfully added", userObj => {
    // sessionStorage = Object.assign(sessionStorage, userObj);
    sessionStorage.setItem("name", userObj.name);
    sessionStorage.setItem("userId", userObj.userId);
    USERNAME = userObj.name;
    ID = userObj.userId;
    messageStorage.load();
    console.log(`Username: ${USERNAME}\nId: ${ID}`);
});

socket.on("can't add user", message => {
    message && alert(message);
    connectByUsername();
});

socket.on("message", appendMessage);

export { USERNAME };