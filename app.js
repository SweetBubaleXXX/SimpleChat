const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const users = new Map();

users.isUsed = function (username) {
    for (let socket of this.values()) {
        if (username === socket.data?.name) { return true }
    }
}

app.use(express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', socket => {

    console.log(`\nUser '${socket.id}' connected`);

    socket.on("message", message => {
        io.emit("message", message);
    });

    socket.on("add user", userObj => {
        if (users.isUsed(userObj.name)) {
            return socket.emit("can't add user", "Username already used");
        }
        !("userId" in userObj) && (userObj.userId = Date.now().toString(16));
        socket.data = userObj;
        users.set(userObj.userId, socket);
        socket.emit("successfully added", userObj);
    });

    socket.on('disconnect', () => {
        let id = socket.data?.userId;
        if (id) {
            users.delete(id);
        }
    });
});

http.listen(3000, () => { console.log(`\nServer started at port 3000\n`) });