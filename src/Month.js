import React from "react";

const Month = ({
  month,
  monthIndex,
  rowIndex,
  currentYear,
  currentDate,
  onMonthChangeHandler,
}) => {
  const selectedMonth = rowIndex * 3 + monthIndex;
  const tempSelectedDate = new Date(currentDate);
  let className = "month-picker-month-cell";
  if (
    selectedMonth === tempSelectedDate.getMonth() &&
    currentYear === tempSelectedDate.getFullYear()
  ) {
    className += " selectedMonth";
  }

  const handleOnClickOverMonth = () => {
    const selectedMonth = rowIndex * 3 + monthIndex;
    onMonthChangeHandler(selectedMonth);
  };

  return (
    <td className={className} onClick={handleOnClickOverMonth}>
      {month}
    </td>
  );
};

export default Month;
