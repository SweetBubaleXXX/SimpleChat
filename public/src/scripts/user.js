export default {
    username: undefined,
    id: undefined,

    set(obj) {
        for (let [key, value] of Object.entries(obj)) {
            this[key] = value;
        }
    }
}