const DateFormatter = (dateToFormat: string) => {
  const date = new Date(dateToFormat);
  const [, monthName, dayNumber, fullYear] = date.toDateString().split(" ");

  return monthName + " " + dayNumber + ", " + fullYear;
};

export default DateFormatter;
