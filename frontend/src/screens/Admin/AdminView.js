import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Flex, 
  Stack,
  Center,
  Spinner,
  Button
} from '@chakra-ui/react';
import { API_BASE_URL } from '../../App';
import { useNavigate } from 'react-router-dom';

function AdminView({ userData, onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch employees on initial load
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // api call to get all employees
        const response = await fetch(`${API_BASE_URL}/employees`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError('Failed to fetch employees: ' + err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // Fetch payroll data when an employee is selected
  useEffect(() => {
    const fetchPayrollData = async () => {
      if (selectedEmployee) {
        try {
            // api call to get payroll data for selected employee
            // in this exampl, we are using the employee id to get the payroll data
            // 
          const response = await fetch(`${API_BASE_URL}/payroll?empid=${selectedEmployee.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setPayrollData(data);
        } catch (err) {
          console.error("Error fetching payroll data:", err);
          setError('Failed to fetch payroll data: ' + err.message);
        }
      } else {
        setPayrollData([]);
      }
    };

    fetchPayrollData();
  }, [selectedEmployee]);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackToHomepage = () => {
    navigate('/admin');
  };

  return (
    <Box>
      {/* Header */}
      <Box bg="blue.600" color="white" py={4} px={6} mb={6}>
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center" >
              <Text>
                Welcome, Admin
              </Text>
              <Button colorScheme="blue" variant="outline" onClick={handleBackToHomepage}>
                Search Employees
              </Button>
              <Button colorScheme="blue" variant="outline" onClick={handleBackToHomepage}>
                Update Employees
              </Button>
              <Button colorScheme="blue" variant="outline" onClick={handleBackToHomepage}>
                Add New Employee
              </Button>
              <Button colorScheme="teal" variant="outline" onClick={handleBackToHomepage}>
                Back to Homepage
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {/* Employee List */}
          <Box flex="1" pr={{ base: 0, md: 4 }}>
            <Heading size="md" mb={4}>Employees</Heading>
            
            {employees.length > 0 ? (
              <Stack spacing={2}>
                {employees.map(employee => (
                  <Box 
                    key={employee.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    cursor="pointer"
                    bg={selectedEmployee?.id === employee.id ? "blue.50" : "white"}
                    borderColor={selectedEmployee?.id === employee.id ? "blue.400" : "gray.200"}
                    _hover={{ bg: "gray.50" }}
                    onClick={() => handleEmployeeSelect(employee)}
                    color={selectedEmployee?.id === employee.id ? "blue.600" : "gray.800"}
                  >
                    {employee.firstName} {employee.lastName}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text color="gray.600">No employees found.</Text>
            )}
          </Box>
          
          {/* Employee Details */}
          <Box flex="2">
            {selectedEmployee ? (
              <Stack spacing={6}>
                <Box>
                  <Heading size="md" mb={4}>Employee Details</Heading>
                  <Box p={4} borderWidth="1px" borderRadius="md">
                    <Stack spacing={2}>
                      <Text><strong>ID:</strong> {selectedEmployee.id}</Text>
                      <Text><strong>Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}</Text>
                      <Text><strong>Email:</strong> {selectedEmployee.email}</Text>
                      <Text><strong>Hire Date:</strong> {selectedEmployee.hireDate}</Text>
                      <Text><strong>Salary:</strong> ${selectedEmployee.salary.toFixed(2)}</Text>
                    </Stack>
                  </Box>
                </Box>
                
                <Box>
                  <Heading size="md" mb={4}>Payroll History</Heading>
                  {payrollData.length > 0 ? (
                    <Box overflowX="auto">
                      {/* Simple payroll displays */}
                      <Box borderWidth="1px" borderRadius="md">
                        {/* Header row */}
                        <Flex bg="gray.100" p={2} fontWeight="bold">
                          <Box color={'black'} flex="1">Date</Box>
                          <Box color={'black'} flex="1">Earnings</Box>
                          <Box color={'black'} flex="1">Fed Tax</Box>
                          <Box color={'black'} flex="1">Fed Med</Box>
                          <Box color={'black'} flex="1">State Tax</Box>
                        </Flex>
                        
                        {/* Data rows */}
                        {payrollData.map(payroll => (
                          <Flex key={payroll.payId} p={2} borderTopWidth="1px">
                            <Box flex="1">{payroll.date}</Box>
                            <Box flex="1">${payroll.earnings.toFixed(2)}</Box>
                            <Box flex="1">${payroll.fedTax.toFixed(2)}</Box>
                            <Box flex="1">${payroll.fedMed.toFixed(2)}</Box>
                            <Box flex="1">${payroll.stateTax.toFixed(2)}</Box>
                          </Flex>
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Text color="gray.600">No payroll records found.</Text>
                  )}
                </Box>
              </Stack>
            ) : (
              <Box textAlign="center" py={10}>
                <Text color="gray.500">Please select an employee to view details.</Text>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default AdminView;