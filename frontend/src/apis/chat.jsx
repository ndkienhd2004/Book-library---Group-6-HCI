const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const ChatAI = require("../../config/open-ai/index.js");
const { disconnect } = require("node:process");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    response(socket, msg);
  });
});

io.on("disconnection", () => {
  ChatAI.clearConversation();
});

async function response(socket, msg) {
  try {
    const aiReply = await ChatAI.ChatAI(msg); // Assuming this function exists
    socket.emit("chat message", aiReply);
  } catch (error) {
    console.error("AI response error:", error);
    socket.emit("chat message", "Error processing your message.");
  }
}

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});