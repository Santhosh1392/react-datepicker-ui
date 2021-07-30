# react-datepicker-ui

Date picker component for React

## How to Install

Make sure you have [Node.js](http://nodejs.org/) and NPM installed.

```sh
npm install react-datepicker-ui
```

Or

```sh
yarn add react-datepicker-ui
```

## How to Use

```sh
import React from 'react'
import DatePickerInput from 'react-datepicker-ui'

const DatePicker = () => {
  const handleOnChange = (date) => {
    console.log('date', date)
  }

  return (
    <DatePickerInput
      onChange={handleOnChange}
    />
  )
}
```

## Demo

![Datepicker Demo](https://github.com/Santhosh1392/react-datepicker-ui/blob/main/demo/demo.gif)

Check out [Online Demo](https://korimi.in/projects) here.

```sh
import React from 'react'
import moment from 'moment'
import DatePickerInput from 'react-datepicker-ui'

const DatePickerDemo = () => {
  const handleOnChange = (date) => {
    console.log('date', date)
  }

  const minDate = moment()
  const maxDate = moment().add(1, 'M')
  return (
    <DatePickerInput
      onChange={handleOnChange}
      minDate={minDate}
      maxDate={maxDate}
      placeholder="DD/MM/YYYY"
      format="DD/MM/YYYY"
    />
  )
}
```

## Available PropTypes

| Prop Name    | Type     | Default Value | Description                                             |
| ------------ | -------- | ------------- | ------------------------------------------------------- |
| defaultValue | String   | ''            | Initial Value for datepicker                            |
| format       | String   | 'MM/DD/YYYY'  | Format of the date to be returned                       |
| minDate      | Date     |  null         | Disable dates before mentioned dates to select          |
| maxDate      | Date     |  null         | Disable dates after mentioned dates to select           |
| onChange     | Function | null          | Callback function to get the selected date              | 
| placeholder  | String   | 'MM/DD/YYYY'  | Placeholder to display on input                         |

