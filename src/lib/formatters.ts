import formatDuration from "format-duration";

export const formatTime = (timeInSeconds: number = 0) =>
  formatDuration(timeInSeconds * 1000);

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
