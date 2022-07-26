import useTimer from "hooks/useTimer";
import React, { useState } from "react";
import { addZero } from "utils/helper/addZero";

const Timer = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { countdown } = useTimer();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "40px",
        }}
      >
        <div
          id="hours"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "96px" }}>{addZero(countdown.hours)}</h3>
          <p style={{ fontSize: "40px" }}>Hour</p>
        </div>
        <h3 style={{ fontSize: "96px" }}>:</h3>
        <div
          id="minutes"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "96px" }}>{addZero(countdown.minutes)}</h3>
          <p style={{ fontSize: "40px" }}>Minutes</p>
        </div>
        <h3 style={{ fontSize: "96px" }}>:</h3>
        <div
          id="seconds"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "96px" }}>{addZero(countdown.seconds)}</h3>
          <p style={{ fontSize: "40px" }}>Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
