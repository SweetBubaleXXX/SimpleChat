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
        let messageElem = document.createElement("div");
        messageElem.innerHTML = message.text;
        messageElem.className = "message";
        if (self) {
            messageElem.classList.add("self")
        }
        scroll = createScroller(self);
        messageContainer.append(messageElem);
        scroll();
    }
}

function createScroller(self) {
    let scrlTop = Math.ceil(messageContainer.scrollTop);
    let height = messageContainer.clientHeight;
    let scrlHeight = messageContainer.scrollHeight;
    if (scrlHeight === scrlTop + height || self) {
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

document.addEventListener("DOMContentLoaded", () => {
    while (!USERNAME) {
        USERNAME = prompt("Pick username");
    }
});