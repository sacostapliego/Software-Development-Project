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

function EmployeeViewPay({ userData }) {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        if (!userData || !userData.empid) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/personalPayroll/${userData.empid}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch payroll data: ${response.status}`);
        }
        
        const data = await response.json();
        setPayrollData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payroll data:", err);
        setError('Failed to load payroll information. Please try again later.');
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [userData]);

  const handleBack = () => {
    navigate('/employee');
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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
              Pay History
            </Heading>

            {error ? (
              <Text color="red.500" textAlign="center">{error}</Text>
            ) : payrollData.length > 0 ? (
              <Stack spacing={4}>
                {payrollData.map((pay, index) => (
                  <Box 
                    key={index} 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md"
                    bg="gray.50"
                  >
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">Pay Date:</Text>
                      <Text color="black">{new Date(pay.pay_date).toLocaleDateString()}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">Earnings:</Text>
                      <Text color="black">{formatCurrency(pay.earnings)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">Federal Tax:</Text>
                      <Text color="black">{formatCurrency(pay.fed_tax)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">Medicare:</Text>
                      <Text color="black">{formatCurrency(pay.fed_med)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">Social Security:</Text>
                      <Text color="black">{formatCurrency(pay.fed_SS)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">State Tax:</Text>
                      <Text color="black">{formatCurrency(pay.state_tax)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">401(k):</Text>
                      <Text color="black">{formatCurrency(pay.retire_401k)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" color="gray.700">Health Care:</Text>
                      <Text color="black">{formatCurrency(pay.health_care)}</Text>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text textAlign="center" color="gray.500">No payroll history found.</Text>
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

export default EmployeeViewPay;