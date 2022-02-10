const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', socket => {
    console.log(`\nUser '${socket.id}' connected`);

    // socket.on('disconnect', () => {});
});

http.listen(3000, () => { console.log(`\nServer started at port 3000\n`) });