import USER from './user';

export default class MessageNode {
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
        elem.self = messageObj.sender === USER.username;
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