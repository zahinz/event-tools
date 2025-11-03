export const addZero = (time: number): string => {
  if (time.toString().length === 1) {
    return "0" + time;
  }
  return time.toString();
};
