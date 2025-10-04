export const getFormattedDate = (date: Date) => {
  const formatted = date.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formatted;
};
