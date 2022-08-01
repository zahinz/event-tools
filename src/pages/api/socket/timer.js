import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Connection already established");
  } else {
    console.log("Connection is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("timer", (countdown) => {
        socket.broadcast.emit("timer", countdown);
      });
      socket.on("isRunning", (boolean) => {
        socket.broadcast.emit("isRunning", boolean);
      });
    });
  }
  res.end();
};

export default SocketHandler;
