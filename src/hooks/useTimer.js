import React, { useEffect, useState } from "react";
import { timeMinusOneSecond } from "utils/helper/calculation";

const useTimer = () => {
  // initial state
  const [initialDuration, setInitialDuration] = useState();
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setRunning] = useState(false);

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

  // setDuration function
  const setDuration = (duration) => {
    clearDuration();
    setInitialDuration(duration);
    setCountdown(duration);
  };

  // start and stop
  const start = () => setRunning(true);
  const stop = () => setRunning(false);

  // reset timer
  const reset = () => {
    clearDuration();
    setCountdown(initialDuration);
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
