import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("start_chat", ({ sender, receiver }) => {
    console.log(`Chat started between ${sender} and ${receiver}`);
    socket.join(receiver);
  });

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.to(data.receiver).emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
