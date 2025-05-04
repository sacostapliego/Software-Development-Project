import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Center,
  Button,
  Spinner
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

function EmployeeView({ userData, onGoBack }) {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/employee/${userData.empid}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch employee data: ${response.status}`);
        }
        
        const data = await response.json();
        setEmployeeData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError('Failed to load profile information. Please try again later.');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [userData]);

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigate('/employee');
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Container>
        <Center minH="100vh">
          <Box 
            w="100%" 
            maxW="600px" 
            p={8} 
            borderWidth={1} 
            borderRadius="lg" 
            boxShadow="lg"
            bg="white"
          >
            <Heading mb={6} textAlign="center" size="lg" color={'black'} borderColor={'black'} borderBottomWidth={'medium'}>
              Employee Profile
            </Heading>

            {error ? (
              <Text color="red.500" textAlign="center">{error}</Text>
            ) : employeeData ? (
              <Stack spacing={4}>
                <Flex>
                  <Box width="40%" fontWeight="bold" color="gray.600">Employee ID:</Box>
                  <Box color="black">{employeeData.empid}</Box>
                </Flex>
                <Flex>
                  <Box width="40%" fontWeight="bold" color="gray.600">Name:</Box>
                  <Box color="black">{employeeData.fname} {employeeData.lname}</Box>
                </Flex>
                <Flex>
                  <Box width="40%" fontWeight="bold" color="gray.600">Email:</Box>
                  <Box color="black">{employeeData.email}</Box>
                </Flex>
                <Flex>
                  <Box width="40%" fontWeight="bold" color="gray.600">Hire Date:</Box>
                  <Box color="black">{employeeData.hire_date}</Box>
                </Flex>
                <Flex>
                  <Box width="40%" fontWeight="bold" color="gray.600">Salary:</Box>
                  <Box color="black">${employeeData.salary.toFixed(2)}</Box>
                </Flex>
              </Stack>
            ) : (
              <Text textAlign="center" color="gray.500">No profile information found.</Text>
            )}
            
            <Center mt={8}>
              <Button 
                colorScheme="blue" 
                onClick={handleBack}
              >
                Back to Home
              </Button>
            </Center>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default EmployeeView;