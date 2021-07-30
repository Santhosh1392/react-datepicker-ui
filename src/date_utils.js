export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const HEADER_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
export const FINAL_MONTH_INDEX = 11;
export const INITIAL_MONTH_INDEX = 0;
export const YEAR_PERIOD = 12;
export const DAY_VIEW = "Day";
export const MONTH_VIEW = "Month";
export const YEAR_VIEW = "Year";

export const getNumberOfDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDaysOfMonth = (month, year) => {
  let monthDays = [];
  const numberOfDays = getNumberOfDaysInMonth(year, month);
  let week = ['', '', '', '', '', '', ''];
  for (let j = 1; j <= numberOfDays; j++) {
    let tempDate = new Date();
    tempDate.setFullYear(year);
    tempDate.setDate(j);
    tempDate.setMonth(month);
    let dayIndex = tempDate.getDay();
    if (dayIndex === 0 && j !== 1 && j !== numberOfDays) {
      monthDays.push(week);
      week = ['', '', '', '', '', '', ''];
      week[dayIndex] = j;
    } else if (dayIndex === 0 && j === 1) {
      week[dayIndex] = j;
    } else if (dayIndex !== 0 && j !== numberOfDays) {
      week[dayIndex] = j;
    } else if (j === numberOfDays) {
      if (dayIndex !== 0) {
        week[dayIndex] = j;
        monthDays.push(week);
      } else if (dayIndex === 0) {
        monthDays.push(week);
        week = ['', '', '', '', '', '', ''];
        week[dayIndex] = j;
        monthDays.push(week);
      }
    }
  }
  return monthDays;
};

export const getYears = (startYear, endYear) => {
  const YEARS = [];
  let count = 0;
  let yearRow = [];
  for (let i = startYear; i <= endYear; i++) {
    yearRow.push(i);
    count++;
    if (count % 3 === 0) {
      count = 0;
      YEARS.push(yearRow);
      yearRow = [];
    }
  }

  return YEARS;
}
