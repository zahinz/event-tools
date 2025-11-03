'use client';

import { useEffect, useState, useRef } from "react";
import { timeMinusOneSecond, TimeObject } from "utils/helper/calculation";
import io, { Socket } from "socket.io-client";

let socket: Socket;

const useTimer = () => {
  // initial state
  const [initialDuration, setInitialDuration] = useState<TimeObject | undefined>();
  const [countdown, setCountdown] = useState<TimeObject>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // websocket initialiser
  useEffect(() => {
    socketInitializer();
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("timer");
        socket.off("isRunning");
      }
    };
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket/timer");

    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("timer", (countdown: TimeObject) => {
      setCountdown(countdown);
    });

    socket.on("isRunning", (boolean: boolean) => {
      setRunning(boolean);
    });
  };

  // interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setTimeout(() => {
        setCountdown(timeMinusOneSecond(countdown));
      }, 1000);
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [countdown, isRunning]);

  // clear timeout
  const clearDuration = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // start and stop
  const start = () => {
    if (socket) {
      socket.emit("isRunning", true);
    }
    setRunning(true);
  };
  const stop = () => {
    if (socket) {
      socket.emit("isRunning", false);
    }
    setRunning(false);
  };

  // setDuration function
  const setDuration = (duration: TimeObject) => {
    clearDuration();
    setInitialDuration(duration);
    setCountdown(duration);
    if (socket) {
      socket.emit("timer", duration);
    }
    stop();
  };

  // reset timer
  const reset = () => {
    clearDuration();
    if (initialDuration) {
      setCountdown(initialDuration);
      if (socket) {
        socket.emit("timer", initialDuration);
      }
    }
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
