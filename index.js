function employeeRecord(){
    return {
        firstName: '',
        familyName: '',
        title: '',
        payPerHour: 0,
    }
};

function createTimeArray(empRecord, workedDate, eventType){
    const timeArray = [];

    empRecord[eventType].map(element => {
        if(element.date === workedDate) timeArray.push(element);
    })
    return timeArray.sort((a, b) => a.hour - b.hour);
}


const aggregateData = (arr) => arr.reduce((pv, cv) => pv + cv);

function createEmployeeRecord(empArray){
    const employee = employeeRecord();
    empArray.map((element, index) => employee[Object.keys(employee)[index]] = element);
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(empArrays){
    const employeeRecords = [];
    empArrays.map(element => {
        employeeRecords.push(createEmployeeRecord(element));
    });
    return employeeRecords;
}

function createTimeInEvent(empRecord, timeIn) {
    empRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(timeIn.split(' ')[1], 10),
        date: timeIn.split(' ')[0],
    });

    return empRecord;
}

function createTimeOutEvent(empRecord, timeOut) {
    empRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(timeOut.split(' ')[1], 10),
        date: timeOut.split(' ')[0],
    });

    return empRecord;
}

function hoursWorkedOnDate(empRecord, workedDate){
    const timeIns = createTimeArray(empRecord, workedDate, 'timeInEvents');
    const timeOuts = createTimeArray(empRecord, workedDate, 'timeOutEvents');
    const hoursWorked = [];

    timeIns.map((element, index) => hoursWorked.push(timeOuts[index].hour - element.hour));
    return aggregateData(hoursWorked)/100;
}

const wagesEarnedOnDate = (empRecord, workedDate) => empRecord.payPerHour * hoursWorkedOnDate(empRecord, workedDate);

function allWagesFor(empRecord){
    const dailyWages = [];

    empRecord.timeInEvents.map(element => dailyWages.push(wagesEarnedOnDate(empRecord, element.date)));
    return aggregateData(dailyWages);
}

function calculatePayroll(empRecords){
    const wages = [];

    empRecords.map(element => wages.push(allWagesFor(element)));
    return aggregateData(wages);
}
