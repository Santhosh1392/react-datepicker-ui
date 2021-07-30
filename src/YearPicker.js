import React from "react";
import { getYears, YEAR_VIEW } from "./date_utils";
import DatePickerNavigation from "./PickerNavigation";
import YearRow from "./YearRow";

const YearPicker = ({
  startYear,
  endYear,
  currentYear,
  navigateYearPeriodLeft,
  navigateYearPeriodRight,
  onYearChangeHandler,
  currentDate,
}) => {
  const YEARS =  getYears(startYear, endYear)
  return (
    <>
      <DatePickerNavigation
        currentYear={currentYear}
        navigateOnLeft={navigateYearPeriodLeft}
        navigateOnRight={navigateYearPeriodRight}
        navigateOnCenter={() => {}}
        currentView={YEAR_VIEW}
        startYear={startYear}
        endYear={endYear}
      />
      <table className="year-picker-months-table">
        <tbody>
          {YEARS.map(function (years, index) {
            return (
              <YearRow
                years={years}
                key={`YearPickerRow-${index}`}
                currentYear={currentYear}
                startYear={startYear}
                endYear={endYear}
                onYearChangeHandler={onYearChangeHandler}
                currentDate={currentDate}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default YearPicker
