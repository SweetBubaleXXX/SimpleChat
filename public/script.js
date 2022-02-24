const socket = io();

let USERNAME;
let ID;
const form = document.forms.inputForm;
const messageContainer = document.querySelector(".message-container");
let messageInput = form.elements.input;

const messageList = {
    list: new Array(),

    new(message) {
        let newNode = new MessageNode(message);

        this.list = this.list.filter(node => {
            return node.id !== newNode.id || (() => {
                messageContainer.removeChild(node);
                return false;
            })()
        });

        // let duplicate = this.list.find(node => node.id === newNode.id);
        // if (duplicate) {
        //     messageContainer.removeChild(duplicate);
        //     this.list = this.list.filter(elem => elem !== duplicate)
        // }

        if (!this.list.length) {
            messageContainer.append(newNode);
            return this.list.push(newNode);
        }

        this.list.find((node, index) => {
            if (node.timeMs < newNode.timeMs) {
                node.after(newNode);
                this.list.splice(index, 0, newNode);
                return true;
            }
        });

        this.save();
    },

    save() {
        sessionStorage.history = JSON.stringify(this.list);
    },

    load() {
        let history = "history" in sessionStorage && JSON.parse(sessionStorage.history);
        if (history) {
            messageContainer.innerHTML = '';
            history.forEach((obj, index, arr) => { //reverse
                let converted = new MessageNode({
                    sender: obj.username,
                    senderId: obj.senderId,
                    text: obj.messageBody,
                    time: obj.timeMs
                });
                messageContainer.append(converted);
                arr[index] = converted;
            });
            this.list = history;
        }
    }
}

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
        message = {
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
    messageList.new(message);
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


class MessageNode {
    constructor(messageObj) {
        this.box = this.createBox(messageObj);
        if (!this.box.self) {
            this.box.append(this.createSpan("username"));
        }
        ["messageBody", "time"].forEach((elem) => {
            this.box.append(this.createSpan(elem));
        });
        return this.box;
    }

    createBox(messageObj) {
        let elem = document.createElement("div");
        let date = new Date(messageObj.time);

        elem.id = `${messageObj.senderId}:${messageObj.time}`;
        elem.senderId = messageObj.senderId;
        elem.timeMs = messageObj.time;
        elem.self = messageObj.sender === USERNAME;
        elem.className = "message";
        elem.self && elem.classList.add("self");

        elem.username = messageObj.sender;
        elem.messageBody = messageObj.text;
        elem.time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        return elem;
    }

    createSpan(name) {
        let span = document.createElement("span");
        span.className = name;
        span.innerHTML = this.box[name];
        name === "username" && (span.title = this.box[name]);
        return span;
    }
}


socket.on("connect", () => {
    console.log("You're connected");
});

socket.on("successfully added", userObj => {
    sessionStorage = Object.assign(sessionStorage, userObj);
    USERNAME = userObj.name;
    ID = userObj.userId;
    messageList.load();
    console.log(`Username: ${USERNAME}\nId: ${ID}`);
});

socket.on("can't add user", message => {
    message && alert(message);
    connectByUsername();
});

socket.on("message", appendMessage);