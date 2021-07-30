import moment from "moment";
import React from "react";

const Day = ({
  day, dateChangeHandler, month, year,
  minDate, maxDate, selected
}) => {
  const onDateClickHandler = () => {
    const isDisabledDate = getDateDisabledStatus();

    if (day && !isDisabledDate) {
      const selectedDate = new Date();
      selectedDate.setDate(day);
      selectedDate.setMonth(month);
      selectedDate.setFullYear(year);
      dateChangeHandler(selectedDate);
    }
  }

  const getDateDisabledStatus = () => {
    const currentDate = new Date();
    currentDate.setDate(day);
    currentDate.setMonth(month);
    currentDate.setFullYear(year);
    let flag = false
    if (minDate && minDate instanceof Date && moment(currentDate).isBefore(moment(minDate))) {
      return true;
    }
    if (maxDate && maxDate instanceof Date && moment(currentDate).isSameOrAfter(moment(maxDate))) {
      return true;
    }
    return flag
  }

  let className;
  const tempSelectedDate = new Date(selected);
  const isDisabledDate = getDateDisabledStatus();
  if (day && isDisabledDate) {
    className = "date-picker-monthday disabledDate";
  } else if (day) {
    className = "date-picker-monthday";
  } else {
    className = "date-picker-non-month-day";
  }

  if (
    day === tempSelectedDate.getDate() &&
    month === tempSelectedDate.getMonth() &&
    year === tempSelectedDate.getFullYear()
  ) {
    className += " selectedDate";
  }

  return (
    <td className={className} onClick={onDateClickHandler}>
      {day}
    </td>
  );
}

export default Day
