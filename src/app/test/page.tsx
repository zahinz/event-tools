'use client';

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

const Test = () => {
  // initialise the socket
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket/test");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg: string) => {
      setInput(msg);
    });
  };

  // get the input
  const [input, setInput] = useState("0");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (socket) {
      socket.emit("input-change", e.target.value);
    }
  };

  // test button press
  const [count, setCount] = useState(0);
  const onPressButton = () => {
    setCount(count + 1);
    if (socket) {
      socket.emit("count", count);
    }
    console.log("1", count);
  };
  console.log("2", count);

  return (
    <div>
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
      <button onClick={onPressButton}>press me</button>
      <pre>{count}</pre>
    </div>
  );
};

export default Test;
