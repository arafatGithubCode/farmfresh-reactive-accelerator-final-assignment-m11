export const getDateDiff = (inputDate: Date | string): string => {
  const now = new Date();
  const then = new Date(inputDate);

  let diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const year = Math.floor(diffInSeconds / (12 * 30 * 24 * 3600));
  diffInSeconds %= 12 * 30 * 24 * 3600;

  const month = Math.floor(diffInSeconds / (30 * 24 * 3600));
  diffInSeconds %= 30 * 24 * 3600;

  const week = Math.floor(diffInSeconds / (7 * 24 * 3600));
  diffInSeconds %= 7 * 24 * 3600;

  const day = Math.floor(diffInSeconds / (24 * 3600));
  diffInSeconds %= 24 * 3600;

  const hour = Math.floor(diffInSeconds / 3600);
  diffInSeconds %= 3600;

  const minute = Math.floor(diffInSeconds / 60);
  const second = diffInSeconds % 60;

  const parts: string[] = [];

  if (year > 0) parts.push(`${year} year${year > 1 ? "s" : ""}`);
  if (month > 0) parts.push(`${month} month${month > 1 ? "s" : ""}`);
  if (week > 0) parts.push(`${week} week${week > 1 ? "s" : ""}`);
  if (day > 0) parts.push(`${day} day${day > 1 ? "s" : ""}`);
  if (hour > 0) parts.push(`${hour} hour${hour > 1 ? "s" : ""}`);
  if (minute > 0) parts.push(`${minute} minute${minute > 1 ? "s" : ""}`);
  if (second > 0) parts.push(`${second} second${second > 1 ? "s" : ""}`);

  return parts.slice(0, 2).join(" ") || "just now";
};
