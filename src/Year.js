import React from "react";

const Year = ({ year, currentDate, onYearChangeHandler }) => {
  const tempCurrentYear = new Date(currentDate).getFullYear();
  let className = "year-picker-month-cell";
  if (year === tempCurrentYear) {
    className += " selectedMonth";
  }

  const handleOnClickOverYear = () => {
    onYearChangeHandler(year);
  };
  return (
    <td className={className} onClick={handleOnClickOverYear}>
      {year}
    </td>
  );
};

export default Year;
