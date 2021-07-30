import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePickerWeek from "./Week";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import DatePickerNavigation from "./PickerNavigation";
import {
  DAY_VIEW, FINAL_MONTH_INDEX, getDaysOfMonth,
  HEADER_DAY_NAMES,
  INITIAL_MONTH_INDEX, MONTH_VIEW, YEAR_PERIOD, YEAR_VIEW
} from "./date_utils";
import "./datepicker.scss";
import "./monthpicker.scss";
import "./yearpicker.scss";

const DayPickerHeader = () => {
  return (
    <thead className="datepicker-table-header">
      <tr>
        {HEADER_DAY_NAMES && HEADER_DAY_NAMES.map((hd, index) => (
          <th key={`${hd}-${index}`}>{hd}</th>
        ))}
      </tr>
    </thead>
  )
}

const DatePicker = ({
  date, dateChangeHandler, minDate, maxDate, format
}) => {
  const [curDate, setCurDate] = useState(null);
  const [curMonth, setCurMonth] = useState(null);
  const [curYear, setCurYear] = useState(null);
  const [curView, setCurView] = useState(DAY_VIEW);

  const setInitialState = () => {
    const dateObj = date ? new Date(date) : new Date();
    setCurDate(dateObj);
    setCurMonth(dateObj.getMonth());
    setCurYear(dateObj.getFullYear());
  };

  const navigateMonthLeft = () => {
    if (curMonth > INITIAL_MONTH_INDEX) {
      setCurMonth(curMonth - 1);
    } else if (curMonth === INITIAL_MONTH_INDEX) {
      setCurMonth(FINAL_MONTH_INDEX);
      setCurYear(curYear - 1);
    }
  };

  const navigateMonthRight = () => {
    if (curMonth < FINAL_MONTH_INDEX) {
      setCurMonth(curMonth + 1);
    } else if (curMonth === FINAL_MONTH_INDEX) {
      setCurMonth(INITIAL_MONTH_INDEX);
      setCurYear(curYear + 1);
    }
  };

  const navigateYearLeft = () => {
    setCurYear(curYear - 1);
  };

  const navigateYearRight = () => {
    setCurYear(curYear + 1);
  };

  const navigateYearPeriodLeft = () => {
    setCurYear(curYear - YEAR_PERIOD);
  };

  const navigateYearPeriodRight = () => {
    setCurYear(curYear + YEAR_PERIOD);
  };

  const showMonthPickerView = () => {
    setCurView(MONTH_VIEW);
  };

  const onMonthChangeHandler = (month) => {
    setCurMonth(month);
    setCurView(DAY_VIEW);
  };

  const handleOnDateChange = (date) => {
    setCurDate(moment(date).format(format));
  };

  const onYearChangeHandler = (year) => {
    setCurYear(year);
    setCurView(MONTH_VIEW);
  };

  const changeModeToYear = () => {
    setCurView(YEAR_VIEW);
  };

  useEffect(() => {
    setInitialState();
  }, []);

  const getCurrentView = () => {
    switch(curView) {
      case DAY_VIEW: {
        const monthDays = getDaysOfMonth(curMonth, curYear);
        const dateChangeHandlerFunc = dateChangeHandler
          ? dateChangeHandler
          : handleOnDateChange;
        return (
          <div className='floating-datepicker'>
            <DatePickerNavigation
              currentMonth={curMonth}
              currentYear={curYear}
              navigateOnLeft={navigateMonthLeft}
              navigateOnRight={navigateMonthRight}
              navigateOnCenter={showMonthPickerView}
              currentView={curView}
            />
            <table className="datepicker-table">
              <DayPickerHeader />
              <tbody>
                {monthDays.map(function (week, index) {
                  return (
                    <DatePickerWeek
                      dateChangeHandler={dateChangeHandlerFunc}
                      week={week}
                      key={"week" + index}
                      month={curMonth}
                      year={curYear}
                      minDate={minDate}
                      maxDate={maxDate}
                      selected={curDate}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      }

      case MONTH_VIEW: return (
        <div className='floating-datepicker'>
          <MonthPicker
            currentYear={curYear}
            currentMonth={curMonth}
            currentDate={curDate}
            navigateYearLeft={navigateYearLeft}
            navigateYearRight={navigateYearRight}
            onMonthChangeHandler={onMonthChangeHandler}
            changeModeToYear={changeModeToYear}
          />
        </div>
      )

      case YEAR_VIEW: return (
        <div className='floating-datepicker'>
          <YearPicker
            currentYear={curYear}
            currentMonth={curMonth}
            currentDate={curDate}
            startYear={curYear - 6}
            endYear={curYear + 5}
            navigateYearPeriodLeft={navigateYearPeriodLeft}
            navigateYearPeriodRight={navigateYearPeriodRight}
            onYearChangeHandler={onYearChangeHandler}
          />
        </div>
      )
      default: return ''
    }
  }

  return (
    <div className='date-picker-container'>
      {getCurrentView()}
    </div>
  );
};

export default DatePicker