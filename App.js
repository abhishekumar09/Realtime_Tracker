import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io"; // Correct way to import socket.io in ES6

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Initialize the Socket.io server

app.set("view engine", "ejs"); // Set EJS as the view engine   for using ejs file
app.use(express.static(path.join(__dirname, "public")));      


io.on("connection", function(socket){
    console.log("connected");
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});

