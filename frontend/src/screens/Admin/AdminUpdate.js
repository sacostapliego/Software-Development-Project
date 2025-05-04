import React, { useState, useEffect } from 'react';
import { 
  Box,
  Center,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Container,
  Spinner
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

function AdminUpdate({ userData }) {
  const [empId, setEmpId] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState('');
  const [ssn, setSsn] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we received an employee ID through navigation state
  useEffect(() => {
    if (location.state?.empId) {
      setEmpId(location.state.empId.toString());
      fetchEmployeeData(location.state.empId);
    }
  }, [location.state]);

  const fetchEmployeeData = async (id) => {
    setFetching(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/updateEmployee?empid=${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setEmployeeData(data);
        setFirstName(data.fname || '');
        setLastName(data.lname || '');
        setEmail(data.email || '');
        setHireDate(data.hireDate || '');
        setSalary(data.salary ? data.salary.toString() : '');
        setSsn(data.ssn || '');
      } else {
        setError(data.error || 'Failed to fetch employee data');
        setEmployeeData(null);
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('Failed to fetch employee data. Please try again.');
      setEmployeeData(null);
    } finally {
      setFetching(false);
    }
  };

  const handleFetchEmployee = (e) => {
    e.preventDefault();
    if (!empId) {
      setError('Employee ID is required');
      return;
    }
    fetchEmployeeData(empId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!empId) {
      setError('Employee ID is required');
      setLoading(false);
      return;
    }

    try {
      const salaryNum = salary ? parseInt(salary) : null;
      if (salary && isNaN(salaryNum)) {
        setError('Salary must be a valid number');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/updateEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empId: parseInt(empId),
          fname: firstName || undefined,
          lname: lastName || undefined,
          email: email || undefined,
          hireDate: hireDate || undefined,
          salary: salaryNum || undefined,
          ssn: ssn || undefined
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Employee updated successfully!');
      } else {
        setError(data.message || 'Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container>
        <Center minH="100vh">
          <Box 
            w="100%" 
            maxW="500px" 
            p={8} 
            borderWidth={1} 
            borderRadius="lg" 
            boxShadow="lg"
            bg="white"
          >
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Update Employee</Heading>
            
            {!employeeData && (
              <form onSubmit={handleFetchEmployee}>
                <Stack spacing={4}>
                  <Box>
                    <Text mb={1} color={'black'}>Employee ID</Text>
                    <Input 
                      color={'black'}
                      value={empId} 
                      onChange={(e) => setEmpId(e.target.value)} 
                      placeholder="Enter employee ID"
                      required
                    />
                  </Box>
                  
                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}
                  
                  <Button 
                    colorScheme="blue" 
                    width="full" 
                    type="submit" 
                    isLoading={fetching}
                    mt={2}
                  >
                    Fetch Employee
                  </Button>
                </Stack>
              </form>
            )}
            
            {fetching && (
              <Center my={8}>
                <Spinner size="xl" color="blue.500" />
              </Center>
            )}
            
            {employeeData && !fetching && (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Box>
                    <Text mb={1} color={'black'}>First Name</Text>
                    <Input 
                      color={'black'}
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      placeholder={employeeData.fname || "Enter first name"}
                    />
                  </Box>
                  
                  <Box>
                    <Text mb={1} color={'black'}>Last Name</Text>
                    <Input 
                      color={'black'}
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      placeholder={employeeData.lname || "Enter last name"}
                    />
                  </Box>
                  
                  <Box>
                    <Text mb={1} color={'black'}>Email</Text>
                    <Input 
                      color={'black'}
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder={employeeData.email || "Enter email"}
                    />
                  </Box>
                  
                  <Box>
                    <Text mb={1} color={'black'}>Hire Date</Text>
                    <Input 
                      color={'black'}
                      value={hireDate} 
                      onChange={(e) => setHireDate(e.target.value)} 
                      placeholder={employeeData.hireDate || "YYYY-MM-DD"}
                    />
                  </Box>
                  
                  <Box>
                    <Text mb={1} color={'black'}>Salary ($)</Text>
                    <Input 
                      color={'black'}
                      type="number" 
                      value={salary} 
                      onChange={(e) => setSalary(e.target.value)} 
                      placeholder={employeeData.salary?.toString() || "Enter salary"}
                    />
                  </Box>
                  
                  <Box>
                    <Text mb={1} color={'black'}>SSN</Text>
                    <Input 
                      color={'black'}
                      value={ssn} 
                      onChange={(e) => setSsn(e.target.value)} 
                      placeholder={employeeData.ssn || "Enter SSN"}
                    />
                  </Box>
                  
                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}
                  
                  {success && (
                    <Text color="green.500" fontSize="sm">
                      {success}
                    </Text>
                  )}
                  
                  <Button 
                    colorScheme="blue" 
                    width="full" 
                    type="submit" 
                    isLoading={loading}
                    mt={2}
                  >
                    Update Employee
                  </Button>
                </Stack>
              </form>
            )}
            
            <Button 
              variant="outline"
              width="full" 
              onClick={handleBack}
              color={'black'}
              mt={4}
            >
              Back to Admin Home
            </Button>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default AdminUpdate;