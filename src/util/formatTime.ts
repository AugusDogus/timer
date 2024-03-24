export const formatTime = (time: number) =>
  `${String(Math.floor((time / 60000) % 60)).padStart(2, "0")}:${(
    (time / 1000) %
    60
  ).toFixed(3)}`;
