//create single employee record
function createEmployeeRecord(employeeArray) {
    const employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}

//create array of multiple employee records
function createEmployeeRecords(arrayOfEmployees) {
    return arrayOfEmployees.map(employeeArray => {
        return createEmployeeRecord(employeeArray);
    });
};

//create a time-in log within employee's timeIn array
function createTimeInEvent(date) {
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10)
    }
    this.timeInEvents.push(timeObj);
    return this;
}

//create a time-out log within employee's timeOut array
function createTimeOutEvent(date) {
    const timeObj = {
        type: "TimeOut",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10)
    }
    this.timeOutEvents.push(timeObj);
    return this;
}

//calculate amount of hours employee worked on a given date
function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(e => {
        return e.date === date;
    })
    let timeOutEvent = this.timeOutEvents.find(e => {
        return e.date === date;
    })
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

//calculate amount of wages earned on a given date
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

//calculates all wages for 
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}

//takes employee records and returns the object that matches name
function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(e => e.firstName === firstName)
}

//calculates the sume of pay owed to all employees for all dates
function calculatePayroll(employeeRecordsArray) {
    return employeeRecordsArray.reduce((total, currentEmployee) => {
        return total + allWagesFor.call(currentEmployee);
    }, 0);
}