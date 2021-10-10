function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(records) {
  return records.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(record, dateStamp) {
  // Create a new timeObj and update using dateStamp info
  const splitDate = dateStamp.split(" ");
  const newTimeObj = {
    type: "TimeIn",
    date: splitDate[0],
    hour: parseInt(splitDate[1]),
  }

  // Push the newTimeObj to the timeInEvents array of that record
  record.timeInEvents.push(newTimeObj);
  // return updated record
  return record;
}

function createTimeOutEvent(record, dateStamp) {
  // Create a new timeObj and update using dateStamp inf
  const splitDate = dateStamp.split(" ");
  const newTimeObj = {
    type: "TimeOut",
    date: splitDate[0],
    hour: parseInt(splitDate[1]),
  }

  // Push the newTimeObj to the timeInEvents array of that record
  record.timeOutEvents.push(newTimeObj);
  // return updated record
  return record;
}

function hoursWorkedOnDate(record, date) {
  // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
  // Find the timeIn date, save the time on that date
  let timeIn;
  record.timeInEvents.find(el => {
    if (date === el.date) {
      return timeIn = el.hour / 100;
    }
  });
  // Find the timeOut date, save the time on that date
  let timeOut;
  record.timeOutEvents.find(el => {
    if (date === el.date) {
      return timeOut = el.hour / 100;
    }
  });
  // Return the difference between timeOut and timeIn
  return timeOut - timeIn;
}

function wagesEarnedOnDate(record, date) {
  // Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
  // Find hours worked
  const hours = hoursWorkedOnDate(record, date);
  const wage = record.payPerHour;
  // return pay owed
  return hours * wage;
}

function allWagesFor(record) {
  // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...
  let dates = [];
  record.timeInEvents.map(el => dates.push(el.date));

  let wages = dates.map(date => wagesEarnedOnDate(record, date));
  let totalWage = wages.reduce((a, b) => a + b);
  return totalWage;
}

function calculatePayroll(records) {
  let allWagesArray = records.map(record => allWagesFor(record));
  let payroll = allWagesArray.reduce((a, b) => a + b);
  return payroll;
}
