import useTimer from "hooks/useTimer";
import React, { useState } from "react";

const Settings = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { start, stop, reset, setDuration } = useTimer();
  const handleSubmit = () => {
    setDuration(time);
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <input
          value={time.hours}
          type="number"
          min="0"
          max="23"
          maxLength="2"
          onChange={({ target: { value } }) => {
            if (value > 23) {
              setTime({ ...time, hours: 23 });
            } else {
              setTime({ ...time, hours: parseInt(value) });
            }
          }}
        />
        <input
          value={time.minutes}
          type="number"
          min="0"
          max="59"
          maxLength="2"
          onChange={({ target: { value } }) => {
            if (value > 59) {
              setTime({ ...time, minutes: 59 });
            } else {
              setTime({ ...time, minutes: parseInt(value) });
            }
          }}
        />
        <input
          value={time.seconds}
          type="number"
          min="0"
          max="59"
          maxLength="2"
          onChange={({ target: { value } }) => {
            if (value > 59) {
              setTime({ ...time, seconds: 59 });
            } else {
              setTime({ ...time, seconds: parseInt(value) });
            }
          }}
        />
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Settings;
