import React from "react";

const settings = () => {
  return (
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
            setTime({ ...time, hours: value });
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
            setTime({ ...time, minutes: value });
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
            setTime({ ...time, seconds: value });
          }
        }}
      />
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button
        onClick={() => {
          setDuration(time);
        }}
      >
        Submit
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default settings;
