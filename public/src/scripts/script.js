import USER from './user';
import { messageStorage, messageContainer } from "./messageStorage";
import Scroller from './scroller';
import debounce from './debounce';

const socket = io();

const form = document.forms.inputForm;
let messageInput = form.elements.input;
let toBottomButton = document.getElementById("to-bottom-icon");

form.addEventListener("submit", sendMessage);
messageInput.onkeyup = detectCtrlEnter;
toBottomButton.onclick = Scroller.scroll;

messageContainer.onscroll = debounce(e => {
    showToBottom(e);
}, 100);

document.addEventListener("DOMContentLoaded", () => {
    reconnectFromStorage();
});

document.documentElement.setAttribute('class',
    'ontouchend' in document ? 'touch' : 'no-touch');

function showToBottom(e) {
    let elem = e.target;
    let frame = document.querySelector(".frame");
    if (Scroller.ifNotFirstPage(elem)) {
        frame.classList.add("to-bottom");
    }
    else {
        frame.classList.remove("to-bottom");
    }
}

// Sends message on Ctrl+Enter
function detectCtrlEnter(e) {
    if (e.ctrlKey && e.code === "Enter") {
        sendMessage(e);
    }
}

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

socket.on("new user", amount => {
    document.getElementById("user-count").innerHTML = amount;
});

socket.on("message", appendMessage);