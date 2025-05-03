const API_BASE_URL = 'http://localhost:8080/api';

export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const getPayrollByEmployee = async (employeeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payroll?empid=${employeeId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching payroll for employee ${employeeId}:`, error);
    throw error;
  }
};