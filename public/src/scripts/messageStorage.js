import MessageNode from "./messageNode";

const messageContainer = document.querySelector(".message-container");

const messageStorage = {
    list: new Array(),

    new(message) {
        let newNode = new MessageNode(message);

        this.list = this.list.filter(node => {
            return node.id !== newNode.id || (() => {
                messageContainer.removeChild(node);
                return false;
            })()
        });

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
            history.reverse().forEach((obj, index, arr) => {
                let converted = new MessageNode({
                    sender: obj.username,
                    senderId: obj.senderId,
                    text: obj.messageBody,
                    time: obj.timeMs
                });
                messageContainer.append(converted);
                arr[index] = converted;
            });
            this.list = history.slice().reverse();
        }
    }
};

export { messageStorage, messageContainer };