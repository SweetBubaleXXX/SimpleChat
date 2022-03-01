import { messageContainer } from "./messageStorage";

/*
Defines if should scroll and scrolls after callback function

callback: function after that it tries to scroll

shouldScroll: <Boolean>, if true: ignores current scroll position
*/
export default class Scroller {
    constructor(callback, shouldScroll = false) {
        shouldScroll = shouldScroll || this._ifBottom();
        callback();
        shouldScroll && this.constructor.scroll();
    }

    _ifBottom() {
        let scrlTop = Math.ceil(messageContainer.scrollTop);
        let height = messageContainer.clientHeight;
        let scrlHeight = messageContainer.scrollHeight;
        return scrlHeight <= scrlTop + height;
    }

    static scroll() {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    static ifNotFirstPage(elem) {
        return elem.scrollHeight - elem.scrollTop > 2 * elem.clientHeight;
    }

    // Returns current scroll position [0, 1]
    // static getScrollPos(elem) {
    //     return elem.scrollTop / (elem.scrlHeight - elem.clientHeight);
    // }
}