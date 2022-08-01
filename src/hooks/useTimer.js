import React, { useEffect, useRef, useState } from "react";
import { timeMinusOneSecond } from "utils/helper/calculation";
import io from "socket.io-client";

const socket = io();

const useTimer = () => {
  // initial state
  const [initialDuration, setInitialDuration] = useState();
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setRunning] = useState(false);

  // websocket initialiser
  useEffect(() => {
    socketInitializer();
    return () => {
      socket.off("connect");
      socket.off("timer");
      socket.off("isRunning");
    };
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket/timer");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("timer", (countdown) => {
      setCountdown(countdown);
    });

    socket.on("isRunning", (boolean) => {
      setRunning(boolean);
    });
  };

  // interval
  let timer;
  useEffect(() => {
    if (isRunning) {
      timer = setTimeout(() => {
        setCountdown(timeMinusOneSecond(countdown));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isRunning]);

  // clear timeout
  const clearDuration = () => clearTimeout(timer);

  // start and stop
  const start = () => {
    socket.emit("isRunning", true);
    setRunning(true);
  };
  const stop = () => {
    socket.emit("isRunning", false);
    setRunning(false);
  };

  // setDuration function
  const setDuration = (duration) => {
    clearDuration();
    setInitialDuration(duration);
    setCountdown(duration);
    socket.emit("timer", duration);
    stop();
  };

  // reset timer
  const reset = () => {
    clearDuration();
    setCountdown(initialDuration);
    socket.emit("timer", initialDuration);
    stop();
  };

  return {
    countdown,
    setDuration,
    clearDuration,
    start,
    stop,
    reset,
  };
};

export default useTimer;
