export default {
    id: undefined,
    _username: undefined,

    get username() {
        return this._username;
    },

    set username(val) {
        this._username = val;
        document.getElementById("top-username").innerHTML = val;
    },

    set(obj) {
        for (let [key, value] of Object.entries(obj)) {
            this[key] = value;
        }
    }
}