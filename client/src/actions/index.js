import axios from 'axios';

const getAllUsers = () => {
  const response = axios.get('/users');

  return {
    type: 'GET_USERS',
    payload: response,
  };
};

const getAllScheduleDates = () => {
  const response = axios.get('/schedule_dates');

  return {
    type: 'GET_SCHEDULE_DATES',
    payload: response,
  };
};

const getAllEmployeeAvailabilities = () => {
  const response = axios.get('/employee_availabilities');

  return {
    type: 'GET_EMPLOYEE_AVAILABILITIES',
    payload: response,
  };
};

const getAllDayParts = () => {
  const response = axios.get('/day_parts');

  return {
    type: 'GET_DAY_PARTS',
    payload: response,
  };
};


const getAllNeededEmployees = () => {
  const response = axios.get('/needed_employees');

  return {
    type: 'GET_NEEDED_EMPLOYEES',
    payload: response,
  };
};


const generateSchedule = (mondayDate) => {
  const response = axios.post('/generate_schedule', { mondayDate });

  return {
    type: 'GET_ACTUAL_SCHEDULE',
    payload: response,
  }
};

const addEmployee = (username, password) => {
  const response = axios.post('/add_employee', { username, password });
  return {
    type: 'ADD_EMPLOYEE',
    payload: response,
  };
};

const updateEmployeeAvailability = (employee, newAvailabilities) => {
  const requestBody = Object.keys(newAvailabilities).map((dayPartId) => {
    return { user_id: employee.id, day_part_id: dayPartId, is_available: newAvailabilities[dayPartId] };
  });

  const response = axios.patch('/employee_availability', {
    employeeAvailabilities: requestBody,
  });

  return {
    type: 'UPDATE_EMPLOYEE_AVAILABILITY',
    payload: response,
  };
};

const updateNeededEmployees = (schedule, newAvailabilities) => {
  const requestBody = Object.keys(newAvailabilities).map((dayPartId) => {
    return { schedule_id: schedule.id, day_part_id: dayPartId, employees_needed: newAvailabilities[dayPartId] };
  });

  const response = axios.patch('/needed_employees', {
    scheduleAvailabilities: requestBody,
  });

  return {
    type: 'UPDATE_NEEDED_EMPLOYEES',
    payload: response,
  };
};

const createScheduleTemplate = (monDate, scheduleTemplate) => {
  const requestBody = Object.keys(scheduleTemplate).map((dayPartId) => {
    return { monday_dates: monDate, day_part_id: dayPartId, employees_needed: scheduleTemplate[dayPartId] };
  });

  const response = axios.post('/needed_employees', {
    scheduleTemplate: requestBody
  });

  return {
    type: 'CREATE_SCHEDULE_TEMPLATE',
    payload: response,
  };
};

const changeView = (newView) => {
  return {
    type: 'CHANGE_VIEW',
    view: newView,
  }
};

const login = (creds) => {
  const response = axios.post('/login', { creds })
  return {
    type: 'GET_ALL',
    payload: response,
  }
}

const signUp = (creds) => {
  const response = axios.post('/signup', { creds });
  return {
    type: 'GET_ALL',
    payload: response,
  }
}

const checkedIfLoggedIn = () => {
  const response = axios.get('/welcome_back');

  return {
    type: 'GET_ALL',
    payload: response,
  }
}

module.exports = {
  checkedIfLoggedIn: checkedIfLoggedIn,
  generateSchedule: generateSchedule,
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllUsers: getAllUsers,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
  getAllNeededEmployees: getAllNeededEmployees,
  updateNeededEmployees: updateNeededEmployees,
  getAllScheduleDates: getAllScheduleDates,
  createScheduleTemplate: createScheduleTemplate,
  addEmployee: addEmployee,
  changeView: changeView,
  login: login,
  signUp: signUp,
};
