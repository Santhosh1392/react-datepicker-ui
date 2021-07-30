import React from "react";
import Year from "./Year";

const YearRow = ({
  years,
  rowIndex,
  currentYear,
  currentDate,
  onYearChangeHandler,
}) => {
  return (
    <tr className="year-picker-row">
      {years.map((year, index) => {
        return (
          <Year
            year={year}
            rowIndex={rowIndex}
            monthIndex={index}
            currentYear={currentYear}
            currentDate={currentDate}
            key={`YearRow-${index}`}
            onYearChangeHandler={onYearChangeHandler}
          />
        );
      })}
    </tr>
  );
};

export default YearRow;
