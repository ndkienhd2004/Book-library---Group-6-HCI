const express = require("express");
const route = require("./routes/index.route.js");
const cors = require("cors");
const cookies = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/mongodb.config.js");
const bodyParser = require("body-parser");
const openai = require("./config/openai.config.js");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const AIChat = require("./services/openaichat.service.js");
const { disconnect } = require("node:process");

const app = express();

// Connect to Database
connectDB();

// Enable CORS
app.use(cors());

//Enable Cookie - JWT
app.use(cookies());

// Enable JSON and HTML Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" })); // Tăng giới hạn JSON
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Static middleware để phục vụ các file trong thư mục `public`
app.use("/public", express.static(path.join(__dirname, "public")));

// Routing app
route(app);

// websocket initialize
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("chat message", async (msg) => {
    try {
      const aiReply = await AIChat.chatAI(msg);
      socket.emit("chat message", aiReply);
    } catch (error) {
      console.error("AI response error:", error);
      socket.emit("chat message", "Error processing your message.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    AIChat.clearConversation();
  });
});

io.on("disconnect", () => {
  AIChat.clearConversation();
});

// Hosting website
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const port = process.env.PORT || 3000; // Ensure PORT is correctly set
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
