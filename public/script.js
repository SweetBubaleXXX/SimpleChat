const socket = io();

socket.on("connect", () => {
    console.log("You're connected");
});