import React, { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const Test = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket/test");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("count", (msg) => {
      setCount(msg);
    });
  };

  return <div>{count}</div>;
};

export default Test;
