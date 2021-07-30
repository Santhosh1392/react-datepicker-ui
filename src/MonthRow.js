import React from "react";
import Month from "./Month";

const MonthRow = ({
  months,
  rowIndex,
  onMonthChangeHandler,
  currentYear,
  currentDate,
}) => {
  return (
    <tr className="month-picker-row">
      {months.map((month, index) =>{
        return (
          <Month
            month={month}
            rowIndex={rowIndex}
            monthIndex={index}
            currentYear={currentYear}
            currentDate={currentDate}
            key={`MonthPickerMonth-${index}`}
            onMonthChangeHandler={onMonthChangeHandler}
          />
        );
      })}
    </tr>
  );
};

export default MonthRow
