const socket = io();

socket.on("connect", () => {
    console.log("You're connected");
});

socket.on("message", appendMessage);


let USERNAME;
const form = document.forms.inputForm;
const messageContainer = document.querySelector(".message-container");
const messageInput = form.elements.input;

form.addEventListener("submit", sendMessage);
messageInput.onkeyup = detectCtrlEnter;

document.addEventListener("DOMContentLoaded", () => {
    while (!USERNAME) {
        USERNAME = prompt("Pick username");
    }
});

function sendMessage(e) {
    e.preventDefault();

    let text = messageInput.value;
    if (text) {
        let date = Date.now();
        message = {
            sender: USERNAME,
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
    constructor(messageObj, self) {
        this.username = messageObj.sender;
        this.messageBody = messageObj.text;
        let date = new Date(messageObj.time);
        this.time = `${date.getHours()}:${date.getMinutes()}`;
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
        elem.className = "message";
        this.self && elem.classList.add("self");
        return elem;
    }

    createSpan(name) {
        let span = document.createElement("span");
        span.className = name;
        span.innerHTML = this[name];
        return span;
    }
}