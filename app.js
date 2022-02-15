const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const users = new Map();

app.use(express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', socket => {
    console.log(`\nUser '${socket.id}' connected`);
    users.add()
    
    socket.on("message", message => {
        io.emit("message", message);
    });
    
    socket.on("add user", userObj => {
        let id = Date.now().toString(16);
        userObj.userId = id;
        socket.data = userObj;
        socket.emit("successfully added", userObj);
    });

    // socket.on('disconnect', () => {});
});

http.listen(3000, () => { console.log(`\nServer started at port 3000\n`) });