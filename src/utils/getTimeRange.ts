export const getTimeRange = (date: Date) => {
  const start = new Date(date);
  start.setHours(10, 0, 0);
  const end = new Date(date);
  end.setHours(12, 0, 0);

  const formatTime = (time: Date) =>
    time.toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return `${formatTime(start)} - ${formatTime(end)}`;
};
