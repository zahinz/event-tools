export interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

export const timeMinusOneSecond = ({ hours, minutes, seconds }: TimeObject): TimeObject => {
  let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
  let timeLeft = totalSeconds - 1;
  if (timeLeft > 0) {
    return parseToObject(timeLeft);
  } else {
    return parseToObject(0);
  }
};

export const parseToObject = (seconds: number): TimeObject => ({
  hours: Math.floor((seconds / 3600) % 24),
  minutes: Math.floor((seconds / 60) % 60),
  seconds: Math.floor(seconds % 60),
});
