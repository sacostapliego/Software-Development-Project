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

  useEffect(() => {
    const fetchPayrollData = async () => {
      if (selectedEmployee) {
        try {
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

  const handleSearchEmployees = () => {
    navigate('/admin/employees/search');
  };

  return (
    <Box background={'white'} color={'black'} minH="100vh" width="100%">
      <Container maxW="container.xl" pt={6}>
        {/* New header row with Employees title and buttons on same line */}
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading size="md">Employees</Heading>
          <Flex gap={2}>
            <Button size="sm" onClick={handleSearchEmployees}>
              Search Employees
            </Button>
            <Button size="sm" onClick={handleBackToHomepage}>
              Back to Homepage
            </Button>
          </Flex>
        </Flex>
        
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {/* Employee List */}
          <Box flex="1" pr={{ base: 0, md: 4 }}>
            {loading ? (
              <Center p={10}>
                <Spinner size="xl" />
              </Center>
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : employees.length > 0 ? (
              <Stack spacing={2}>
                {employees.map(employee => (
                  <Box 
                    key={employee.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    cursor="pointer"
                    bg={selectedEmployee?.id === employee.id ? "blue.50" : "white"}
                    borderColor={selectedEmployee?.id === employee.id ? "blue.400" : "black"}
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