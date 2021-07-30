import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import DatePicker from "./DatePicker";
import "./datepicker_input.scss";

const DatePickerInput = ({
  format, minDate, maxDate, onChange, placeholder, defaultValue
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(defaultValue || '')
  const datePickerRef = useRef(null)

  const openDatePicker = () => {
    setShowDatePicker(prevState => !prevState)
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeDatePickerOnOutsideClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", closeDatePickerOnOutsideClick);
    };
  }, [])

  const closeDatePickerOnOutsideClick = (e) => {
    if (!datePickerRef.current.contains(e.target)) {
      setShowDatePicker(false)
    }
  }

  const dateChangeHandler = (date) => {
    setDate(moment(date).format(format))
    setShowDatePicker(false)
  }

  const clearDateInput = () => {
    setDate('')
  }

  useEffect(() => {
    if (onChange instanceof Function) {
      onChange({
        dateString: date,
        dateObject: moment(date).toDate()
      })
    }
  }, [date])

  return (
    <div
      ref={datePickerRef}
      className="react-datepicker-input-conatiner">
      <input
        className="datepicker-input"
        onClick={openDatePicker}
        value={date}
        placeholder={placeholder}
        readOnly
      />
      {date && (
        <i
          className="fa fa-times clear-calendar-icon"
          onClick={clearDateInput}
        />
      )}
      <i
        className="fa fa-calendar datepicker-calendar-icon"
        onClick={openDatePicker}
      />
      {showDatePicker && (
        <DatePicker
          dateChangeHandler={dateChangeHandler}
          className="floating-datepicker"
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          format={format}
        />
      )}
    </div>
  );
};

DatePickerInput.defaultProps = {
  format: "MM/DD/YYYY",
  minDate: null,
  maxDate: null,
  placeholder: 'MM/DD/YYYY'
}

export default DatePickerInput
