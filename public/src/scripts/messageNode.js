import USER from './user';

/*
Generates HTML element from message object

message: <Object>

Returns <HTMLDivElement>
*/
export default class MessageNode {
    constructor(message) {
        this.box = this.createBox(message);
        if (!this.box.self) {
            this.box.append(this.createSpan("username"));
        }
        ["messageBody", "time"].forEach((elem) => {
            this.box.append(this.createSpan(elem));
        });
        return this.box;
    }

    createBox(message) {
        let elem = document.createElement("div");
        let date = new Date(message.time);
        elem.messageObj = message;

        elem.id = message.id;
        elem.className = "message";

        elem.self = message.senderId === USER.id;
        elem.self && elem.classList.add("self");

        elem.username = message.sender;
        elem.messageBody = message.text;
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