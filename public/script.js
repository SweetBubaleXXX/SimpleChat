const socket = io();

let USERNAME;
let ID;
const form = document.forms.inputForm;
const messageContainer = document.querySelector(".message-container");
const messageInput = form.elements.input;
const messageList = new Array;

form.addEventListener("submit", sendMessage);
messageInput.onkeyup = detectCtrlEnter;

document.addEventListener("DOMContentLoaded", () => {
    reconnectFromStorage();
});

messageList.new = function (message) {

}

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
        message = {
            sender: USERNAME,
            senderId: ID,
            id: `${ID}:${date}`,
            text: text,
            time: date
        }
        socket.emit("message", message);
        appendMessage(message, true);
        messageInput.value = "";
    }
}

function appendMessage(message, self = false) {
    if (self || USERNAME !== message.sender) {
        scroll = createScroller(self);
        messageContainer.append(new MessageNode(message, self));
        scroll();
    }
}

function createScroller(self) {
    let scrlTop = Math.ceil(messageContainer.scrollTop);
    let height = messageContainer.clientHeight;
    let scrlHeight = messageContainer.scrollHeight;
    if (scrlHeight <= scrlTop + height || self) {
        var shouldScroll = true;
    }

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

class MessageNode {
    constructor(messageObj, self = false) {
        this.username = messageObj.sender;
        this.messageBody = messageObj.text;
        this.id = messageObj.time;
        let date = new Date(messageObj.time);
        this.time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        this.self = self;
        return this.build();
    }

    build() {
        let messageBox = this.createBox();
        !this.self && messageBox.append(this.createSpan("username"));
        ["messageBody", "time"].forEach((elem) => {
            messageBox.append(this.createSpan(elem));
        });
        return messageBox;
    }

    createBox() {
        let elem = document.createElement("div");
        elem.id = this.id;
        elem.className = "message";
        this.self && elem.classList.add("self");
        return elem;
    }

    createSpan(name) {
        let span = document.createElement("span");
        span.className = name;
        span.innerHTML = this[name];
        name === "username" && (span.title = this[name]);
        return span;
    }
}


socket.on("connect", () => {
    console.log("You're connected");
});

socket.on("successfully added", userObj => {
    sessionStorage = Object.assign(sessionStorage, userObj)
    USERNAME = userObj.name;
    ID = userObj.userId;
    console.log(`Username: ${USERNAME}\nId: ${ID}`);
});

socket.on("can't add user", message => {
    message && alert(message);
    connectByUsername();
});

socket.on("message", appendMessage);