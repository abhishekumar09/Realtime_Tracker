import express from "express";
import http from "http";
import path, { dirname } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from 'url'; // Importing fileURLToPath from the 'url' module

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url); // Convert module URL to file path
const __dirname = dirname(__filename); // Get directory name

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Initialize the Socket.io server

app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.static(path.join(__dirname, "public"))); // Static file setup

io.on("connection",function(socket)  {
    socket.on("send-location", function (data){
    io.emit("recieve-location", {id: socket.id, ...data});
    });
socket.on("disconnect", function(){
    io.emit("user-disconnected", socket.id)
})

});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000);
