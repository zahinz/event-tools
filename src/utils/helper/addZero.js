export const addZero = (time) => {
  if (time.toString().length === 1) {
    return "0" + time;
  }
  return time;
};
