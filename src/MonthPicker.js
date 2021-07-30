import React from "react";
import { MONTH_VIEW } from "./date_utils";
import MonthRow from "./MonthRow";
import DatePickerNavigation from './PickerNavigation'

const MONTHS = [
  ['Jan', 'Feb', 'Mar'],
  ['Apr', 'May', 'Jun'],
  ['Jul', 'Aug', 'Sep'],
  ['Oct', 'Nov', 'Dec'],
];

const MonthPicker = ({
  currentYear,
  navigateYearLeft,
  navigateYearRight,
  onMonthChangeHandler,
  currentDate,
  changeModeToYear
}) => {
  return (
    <>
      <DatePickerNavigation
        currentYear={currentYear}
        navigateOnLeft={navigateYearLeft}
        navigateOnRight={navigateYearRight}
        navigateOnCenter={changeModeToYear}
        currentView={MONTH_VIEW}
      />
      <table className="month-picker-months-table">
        <tbody>
          {MONTHS.map(function (months, index) {
            return (
              <MonthRow
                months={months}
                key={`MonthPickerRow-${index}`}
                rowIndex={index}
                currentYear={currentYear}
                currentDate={currentDate}
                onMonthChangeHandler={onMonthChangeHandler}
              />
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default MonthPicker
