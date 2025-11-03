import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

interface SocketServer extends HTTPServer {
  io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log("Connection already established");
  } else {
    console.log("Connection is initializing");
    const io = new SocketIOServer(res.socket.server);
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
