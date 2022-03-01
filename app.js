const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;
const users = new Map();

users.isUsed = function (username) {
    for (let socket of this.values()) {
        if (username.toLowerCase() === socket.data?.username.toLowerCase()) { return true }
    }
}

app.use(express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', socket => {

    console.log(`\nUser '${socket.id}' connected`);

    socket.on("message", message => {
        message.time = Date.now();
        io.emit("message", message);
    });

    socket.on("add user", userObj => {
        if (users.isUsed(userObj.username)) {
            return socket.emit("can't add user", "Username already used");
        }
        !("id" in userObj) && (userObj.id = Date.now().toString(16).slice(-8)); // If userObj has no id, generate it from current time
        socket.data = userObj;
        users.set(userObj.id, socket);
        socket.emit("successfully added", userObj);
        io.emit("new user", users.size);
    });

    socket.on('disconnect', () => {
        let id = socket.data?.id;
        if (id) {
            users.delete(id);
            io.emit("new user", users.size);
        }
    });
});

http.listen(PORT, () => { console.log(`\nServer started at port 3000\n`) });