function getWeekDates(current: Date) {
  let week = [];
  // Starting Monday not Sunday
  current.setDate(current.getDate() - current.getDay() + 1);
  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return week;
}

export default getWeekDates;
