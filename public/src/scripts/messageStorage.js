import MessageNode from "./messageNode";
import Scroller from "./scroller";

const MESSAGE_HISTORY_LIMIT = 100;

const messageContainer = document.querySelector(".message-container");

const messageStorage = {
    list: new Array(),

    new(message) {
        let newNode = new MessageNode(message);

        this.list = this.list.filter(node => { // Remove duplicate
            return node.messageObj.id !== message.id || (() => {
                messageContainer.removeChild(node);
                return false;
            })()
        });

        if (!this.list.length) { // If list is empty, append message
            messageContainer.append(newNode);
            return this.list.push(newNode);
        }

        this.list.find((node, index) => { // Insert after first older message
            if (node.messageObj.time < message.time) {
                node.after(newNode);
                this.list.splice(index, 0, newNode);
                return true;
            }
        });
        this.save();
    },

    save() {
        let listOfMessages = this.list.map(node => node.messageObj);
        sessionStorage.history = JSON.stringify(listOfMessages.slice(0, MESSAGE_HISTORY_LIMIT));
    },

    load() {
        let history = "history" in sessionStorage && JSON.parse(sessionStorage.history); // false (if not exists) or history Object
        if (history) {
            messageContainer.innerHTML = '';
            history.reverse().forEach((obj, index, arr) => {
                let converted = new MessageNode(obj);
                messageContainer.append(converted);
                arr[index] = converted;
            });
            this.list = history.slice().reverse(); // assign reversed copy
            Scroller.scroll();
        }
    }
};

export { messageStorage, messageContainer };