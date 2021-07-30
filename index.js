'use strict';

var React = require('react');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Day = function Day(_ref) {
  var day = _ref.day,
      dateChangeHandler = _ref.dateChangeHandler,
      month = _ref.month,
      year = _ref.year,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      selected = _ref.selected;

  var onDateClickHandler = function onDateClickHandler() {
    var isDisabledDate = getDateDisabledStatus();

    if (day && !isDisabledDate) {
      var selectedDate = new Date();
      selectedDate.setDate(day);
      selectedDate.setMonth(month);
      selectedDate.setFullYear(year);
      dateChangeHandler(selectedDate);
    }
  };

  var getDateDisabledStatus = function getDateDisabledStatus() {
    var currentDate = new Date();
    currentDate.setDate(day);
    currentDate.setMonth(month);
    currentDate.setFullYear(year);
    var flag = false;

    if (minDate && minDate instanceof Date && moment__default['default'](currentDate).isBefore(moment__default['default'](minDate))) {
      return true;
    }

    if (maxDate && maxDate instanceof Date && moment__default['default'](currentDate).isSameOrAfter(moment__default['default'](maxDate))) {
      return true;
    }

    return flag;
  };

  var className;
  var tempSelectedDate = new Date(selected);
  var isDisabledDate = getDateDisabledStatus();

  if (day && isDisabledDate) {
    className = "date-picker-monthday disabledDate";
  } else if (day) {
    className = "date-picker-monthday";
  } else {
    className = "date-picker-non-month-day";
  }

  if (day === tempSelectedDate.getDate() && month === tempSelectedDate.getMonth() && year === tempSelectedDate.getFullYear()) {
    className += " selectedDate";
  }

  return /*#__PURE__*/React__default['default'].createElement("td", {
    className: className,
    onClick: onDateClickHandler
  }, day);
};

var Week = function Week(_ref) {
  var week = _ref.week,
      dateChangeHandler = _ref.dateChangeHandler,
      month = _ref.month,
      year = _ref.year,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      selected = _ref.selected;
  return /*#__PURE__*/React__default['default'].createElement("tr", null, week.map(function (day, index) {
    return /*#__PURE__*/React__default['default'].createElement(Day, {
      dateChangeHandler: dateChangeHandler,
      day: day,
      key: "day-".concat(month, "-").concat(index),
      month: month,
      year: year,
      minDate: minDate,
      maxDate: maxDate,
      selected: selected
    });
  }));
};

var MONTHS$1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var HEADER_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
var FINAL_MONTH_INDEX = 11;
var INITIAL_MONTH_INDEX = 0;
var YEAR_PERIOD = 12;
var DAY_VIEW = "Day";
var MONTH_VIEW = "Month";
var YEAR_VIEW = "Year";
var getNumberOfDaysInMonth = function getNumberOfDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
};
var getDaysOfMonth = function getDaysOfMonth(month, year) {
  var monthDays = [];
  var numberOfDays = getNumberOfDaysInMonth(year, month);
  var week = ['', '', '', '', '', '', ''];

  for (var j = 1; j <= numberOfDays; j++) {
    var tempDate = new Date();
    tempDate.setFullYear(year);
    tempDate.setDate(j);
    tempDate.setMonth(month);
    var dayIndex = tempDate.getDay();

    if (dayIndex === 0 && j !== 1 && j !== numberOfDays) {
      monthDays.push(week);
      week = ['', '', '', '', '', '', ''];
      week[dayIndex] = j;
    } else if (dayIndex === 0 && j === 1) {
      week[dayIndex] = j;
    } else if (dayIndex !== 0 && j !== numberOfDays) {
      week[dayIndex] = j;
    } else if (j === numberOfDays) {
      if (dayIndex !== 0) {
        week[dayIndex] = j;
        monthDays.push(week);
      } else if (dayIndex === 0) {
        monthDays.push(week);
        week = ['', '', '', '', '', '', ''];
        week[dayIndex] = j;
        monthDays.push(week);
      }
    }
  }

  return monthDays;
};
var getYears = function getYears(startYear, endYear) {
  var YEARS = [];
  var count = 0;
  var yearRow = [];

  for (var i = startYear; i <= endYear; i++) {
    yearRow.push(i);
    count++;

    if (count % 3 === 0) {
      count = 0;
      YEARS.push(yearRow);
      yearRow = [];
    }
  }

  return YEARS;
};

var Month = function Month(_ref) {
  var month = _ref.month,
      monthIndex = _ref.monthIndex,
      rowIndex = _ref.rowIndex,
      currentYear = _ref.currentYear,
      currentDate = _ref.currentDate,
      onMonthChangeHandler = _ref.onMonthChangeHandler;
  var selectedMonth = rowIndex * 3 + monthIndex;
  var tempSelectedDate = new Date(currentDate);
  var className = "month-picker-month-cell";

  if (selectedMonth === tempSelectedDate.getMonth() && currentYear === tempSelectedDate.getFullYear()) {
    className += " selectedMonth";
  }

  var handleOnClickOverMonth = function handleOnClickOverMonth() {
    var selectedMonth = rowIndex * 3 + monthIndex;
    onMonthChangeHandler(selectedMonth);
  };

  return /*#__PURE__*/React__default['default'].createElement("td", {
    className: className,
    onClick: handleOnClickOverMonth
  }, month);
};

var MonthRow = function MonthRow(_ref) {
  var months = _ref.months,
      rowIndex = _ref.rowIndex,
      onMonthChangeHandler = _ref.onMonthChangeHandler,
      currentYear = _ref.currentYear,
      currentDate = _ref.currentDate;
  return /*#__PURE__*/React__default['default'].createElement("tr", {
    className: "month-picker-row"
  }, months.map(function (month, index) {
    return /*#__PURE__*/React__default['default'].createElement(Month, {
      month: month,
      rowIndex: rowIndex,
      monthIndex: index,
      currentYear: currentYear,
      currentDate: currentDate,
      key: "MonthPickerMonth-".concat(index),
      onMonthChangeHandler: onMonthChangeHandler
    });
  }));
};

var DatePickerNavigation = function DatePickerNavigation(_ref) {
  var navigateOnLeft = _ref.navigateOnLeft,
      navigateOnRight = _ref.navigateOnRight,
      navigateOnCenter = _ref.navigateOnCenter,
      currentMonth = _ref.currentMonth,
      currentYear = _ref.currentYear,
      currentView = _ref.currentView,
      startYear = _ref.startYear,
      endYear = _ref.endYear;

  var getDisplayString = function getDisplayString() {
    if (currentView === DAY_VIEW) {
      return "".concat(MONTHS$1[currentMonth], ", ").concat(currentYear);
    } else if (currentView === MONTH_VIEW) {
      return currentYear;
    } else {
      return "".concat(startYear, " - ").concat(endYear);
    }
  };

  return /*#__PURE__*/React__default['default'].createElement("table", {
    className: "datepicker-navigator-table"
  }, /*#__PURE__*/React__default['default'].createElement("tbody", null, /*#__PURE__*/React__default['default'].createElement("tr", {
    className: "datepicker-month-navigator"
  }, /*#__PURE__*/React__default['default'].createElement("td", {
    className: "left-arrow",
    onClick: navigateOnLeft
  }, /*#__PURE__*/React__default['default'].createElement("svg", {
    viewBox: "0 0 1000 1000"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z"
  }))), /*#__PURE__*/React__default['default'].createElement("td", {
    className: "month-name",
    onClick: navigateOnCenter
  }, getDisplayString()), /*#__PURE__*/React__default['default'].createElement("td", {
    className: "right-arrow",
    onClick: navigateOnRight
  }, /*#__PURE__*/React__default['default'].createElement("svg", {
    viewBox: "0 0 1000 1000"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z"
  }))))));
};

var MONTHS = [['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'Jun'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'Dec']];

var MonthPicker = function MonthPicker(_ref) {
  var currentYear = _ref.currentYear,
      navigateYearLeft = _ref.navigateYearLeft,
      navigateYearRight = _ref.navigateYearRight,
      onMonthChangeHandler = _ref.onMonthChangeHandler,
      currentDate = _ref.currentDate,
      changeModeToYear = _ref.changeModeToYear;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(DatePickerNavigation, {
    currentYear: currentYear,
    navigateOnLeft: navigateYearLeft,
    navigateOnRight: navigateYearRight,
    navigateOnCenter: changeModeToYear,
    currentView: MONTH_VIEW
  }), /*#__PURE__*/React__default['default'].createElement("table", {
    className: "month-picker-months-table"
  }, /*#__PURE__*/React__default['default'].createElement("tbody", null, MONTHS.map(function (months, index) {
    return /*#__PURE__*/React__default['default'].createElement(MonthRow, {
      months: months,
      key: "MonthPickerRow-".concat(index),
      rowIndex: index,
      currentYear: currentYear,
      currentDate: currentDate,
      onMonthChangeHandler: onMonthChangeHandler
    });
  }))));
};

var Year = function Year(_ref) {
  var year = _ref.year,
      currentDate = _ref.currentDate,
      onYearChangeHandler = _ref.onYearChangeHandler;
  var tempCurrentYear = new Date(currentDate).getFullYear();
  var className = "year-picker-month-cell";

  if (year === tempCurrentYear) {
    className += " selectedMonth";
  }

  var handleOnClickOverYear = function handleOnClickOverYear() {
    onYearChangeHandler(year);
  };

  return /*#__PURE__*/React__default['default'].createElement("td", {
    className: className,
    onClick: handleOnClickOverYear
  }, year);
};

var YearRow = function YearRow(_ref) {
  var years = _ref.years,
      rowIndex = _ref.rowIndex,
      currentYear = _ref.currentYear,
      currentDate = _ref.currentDate,
      onYearChangeHandler = _ref.onYearChangeHandler;
  return /*#__PURE__*/React__default['default'].createElement("tr", {
    className: "year-picker-row"
  }, years.map(function (year, index) {
    return /*#__PURE__*/React__default['default'].createElement(Year, {
      year: year,
      rowIndex: rowIndex,
      monthIndex: index,
      currentYear: currentYear,
      currentDate: currentDate,
      key: "YearRow-".concat(index),
      onYearChangeHandler: onYearChangeHandler
    });
  }));
};

var YearPicker = function YearPicker(_ref) {
  var startYear = _ref.startYear,
      endYear = _ref.endYear,
      currentYear = _ref.currentYear,
      navigateYearPeriodLeft = _ref.navigateYearPeriodLeft,
      navigateYearPeriodRight = _ref.navigateYearPeriodRight,
      onYearChangeHandler = _ref.onYearChangeHandler,
      currentDate = _ref.currentDate;
  var YEARS = getYears(startYear, endYear);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(DatePickerNavigation, {
    currentYear: currentYear,
    navigateOnLeft: navigateYearPeriodLeft,
    navigateOnRight: navigateYearPeriodRight,
    navigateOnCenter: function navigateOnCenter() {},
    currentView: YEAR_VIEW,
    startYear: startYear,
    endYear: endYear
  }), /*#__PURE__*/React__default['default'].createElement("table", {
    className: "year-picker-months-table"
  }, /*#__PURE__*/React__default['default'].createElement("tbody", null, YEARS.map(function (years, index) {
    return /*#__PURE__*/React__default['default'].createElement(YearRow, {
      years: years,
      key: "YearPickerRow-".concat(index),
      currentYear: currentYear,
      startYear: startYear,
      endYear: endYear,
      onYearChangeHandler: onYearChangeHandler,
      currentDate: currentDate
    });
  }))));
};

var DayPickerHeader = function DayPickerHeader() {
  return /*#__PURE__*/React__default['default'].createElement("thead", {
    className: "datepicker-table-header"
  }, /*#__PURE__*/React__default['default'].createElement("tr", null, HEADER_DAY_NAMES && HEADER_DAY_NAMES.map(function (hd, index) {
    return /*#__PURE__*/React__default['default'].createElement("th", {
      key: "".concat(hd, "-").concat(index)
    }, hd);
  })));
};

var DatePicker = function DatePicker(_ref) {
  var date = _ref.date,
      dateChangeHandler = _ref.dateChangeHandler,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      format = _ref.format;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      curDate = _useState2[0],
      setCurDate = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      curMonth = _useState4[0],
      setCurMonth = _useState4[1];

  var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      curYear = _useState6[0],
      setCurYear = _useState6[1];

  var _useState7 = React.useState(DAY_VIEW),
      _useState8 = _slicedToArray(_useState7, 2),
      curView = _useState8[0],
      setCurView = _useState8[1];

  var setInitialState = function setInitialState() {
    var dateObj = date ? new Date(date) : new Date();
    setCurDate(dateObj);
    setCurMonth(dateObj.getMonth());
    setCurYear(dateObj.getFullYear());
  };

  var navigateMonthLeft = function navigateMonthLeft() {
    if (curMonth > INITIAL_MONTH_INDEX) {
      setCurMonth(curMonth - 1);
    } else if (curMonth === INITIAL_MONTH_INDEX) {
      setCurMonth(FINAL_MONTH_INDEX);
      setCurYear(curYear - 1);
    }
  };

  var navigateMonthRight = function navigateMonthRight() {
    if (curMonth < FINAL_MONTH_INDEX) {
      setCurMonth(curMonth + 1);
    } else if (curMonth === FINAL_MONTH_INDEX) {
      setCurMonth(INITIAL_MONTH_INDEX);
      setCurYear(curYear + 1);
    }
  };

  var navigateYearLeft = function navigateYearLeft() {
    setCurYear(curYear - 1);
  };

  var navigateYearRight = function navigateYearRight() {
    setCurYear(curYear + 1);
  };

  var navigateYearPeriodLeft = function navigateYearPeriodLeft() {
    setCurYear(curYear - YEAR_PERIOD);
  };

  var navigateYearPeriodRight = function navigateYearPeriodRight() {
    setCurYear(curYear + YEAR_PERIOD);
  };

  var showMonthPickerView = function showMonthPickerView() {
    setCurView(MONTH_VIEW);
  };

  var onMonthChangeHandler = function onMonthChangeHandler(month) {
    setCurMonth(month);
    setCurView(DAY_VIEW);
  };

  var handleOnDateChange = function handleOnDateChange(date) {
    setCurDate(moment__default['default'](date).format(format));
  };

  var onYearChangeHandler = function onYearChangeHandler(year) {
    setCurYear(year);
    setCurView(MONTH_VIEW);
  };

  var changeModeToYear = function changeModeToYear() {
    setCurView(YEAR_VIEW);
  };

  React.useEffect(function () {
    setInitialState();
  }, []);

  var getCurrentView = function getCurrentView() {
    switch (curView) {
      case DAY_VIEW:
        {
          var monthDays = getDaysOfMonth(curMonth, curYear);
          var dateChangeHandlerFunc = dateChangeHandler ? dateChangeHandler : handleOnDateChange;
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "floating-datepicker"
          }, /*#__PURE__*/React__default['default'].createElement(DatePickerNavigation, {
            currentMonth: curMonth,
            currentYear: curYear,
            navigateOnLeft: navigateMonthLeft,
            navigateOnRight: navigateMonthRight,
            navigateOnCenter: showMonthPickerView,
            currentView: curView
          }), /*#__PURE__*/React__default['default'].createElement("table", {
            className: "datepicker-table"
          }, /*#__PURE__*/React__default['default'].createElement(DayPickerHeader, null), /*#__PURE__*/React__default['default'].createElement("tbody", null, monthDays.map(function (week, index) {
            return /*#__PURE__*/React__default['default'].createElement(Week, {
              dateChangeHandler: dateChangeHandlerFunc,
              week: week,
              key: "week" + index,
              month: curMonth,
              year: curYear,
              minDate: minDate,
              maxDate: maxDate,
              selected: curDate
            });
          }))));
        }

      case MONTH_VIEW:
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "floating-datepicker"
        }, /*#__PURE__*/React__default['default'].createElement(MonthPicker, {
          currentYear: curYear,
          currentMonth: curMonth,
          currentDate: curDate,
          navigateYearLeft: navigateYearLeft,
          navigateYearRight: navigateYearRight,
          onMonthChangeHandler: onMonthChangeHandler,
          changeModeToYear: changeModeToYear
        }));

      case YEAR_VIEW:
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "floating-datepicker"
        }, /*#__PURE__*/React__default['default'].createElement(YearPicker, {
          currentYear: curYear,
          currentMonth: curMonth,
          currentDate: curDate,
          startYear: curYear - 6,
          endYear: curYear + 5,
          navigateYearPeriodLeft: navigateYearPeriodLeft,
          navigateYearPeriodRight: navigateYearPeriodRight,
          onYearChangeHandler: onYearChangeHandler
        }));

      default:
        return '';
    }
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "date-picker-container"
  }, getCurrentView());
};

var DatePickerInput = function DatePickerInput(_ref) {
  var format = _ref.format,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDatePicker = _useState2[0],
      setShowDatePicker = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      date = _useState4[0],
      setDate = _useState4[1];

  var datePickerRef = React.useRef(null);

  var openDatePicker = function openDatePicker() {
    setShowDatePicker(function (prevState) {
      return !prevState;
    });
  };

  var handleOnChange = function handleOnChange() {};

  React.useEffect(function () {
    document.addEventListener("mousedown", closeDatePickerOnOutsideClick); // return function to be called when unmounted

    return function () {
      document.removeEventListener("mousedown", closeDatePickerOnOutsideClick);
    };
  }, []);

  var closeDatePickerOnOutsideClick = function closeDatePickerOnOutsideClick(e) {
    if (!datePickerRef.current.contains(e.target)) {
      setShowDatePicker(false);
    }
  };

  var dateChangeHandler = function dateChangeHandler(date) {
    setDate(moment__default['default'](date).format(format));
    setShowDatePicker(false);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    ref: datePickerRef,
    className: "react-datepicker-input-conatiner"
  }, /*#__PURE__*/React__default['default'].createElement("input", {
    className: "datepicker-input",
    onClick: openDatePicker,
    onChange: handleOnChange,
    value: date
  }), /*#__PURE__*/React__default['default'].createElement("i", {
    className: "fa fa-calendar datepicker-calendar-icon",
    onClick: openDatePicker
  }), showDatePicker && /*#__PURE__*/React__default['default'].createElement(DatePicker, {
    dateChangeHandler: dateChangeHandler,
    className: "floating-datepicker",
    date: date,
    minDate: minDate,
    maxDate: maxDate,
    format: format
  }));
};

DatePickerInput.defaultProps = {
  format: "MM/DD/YYYY",
  minDate: null
};

module.exports = DatePickerInput;
