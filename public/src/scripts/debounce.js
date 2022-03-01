export default function (callback, ms) {
    let isWaiting = false;
    return function () {
        if (isWaiting) return;
        callback.apply(this, arguments);
        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
        }, ms);
    }
}