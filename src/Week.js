import React from "react";
import Day from "./Day";

const Week = ({
  week,
  dateChangeHandler,
  month,
  year,
  minDate,
  maxDate,
  selected,
}) => {
  return (
    <tr>
      {week.map((day, index) => {
        return (
          <Day
            dateChangeHandler={dateChangeHandler}
            day={day}
            key={`day-${month}-${index}`}
            month={month}
            year={year}
            minDate={minDate}
            maxDate={maxDate}
            selected={selected}
          />
        );
      })}
    </tr>
  );
};

export default Week;
