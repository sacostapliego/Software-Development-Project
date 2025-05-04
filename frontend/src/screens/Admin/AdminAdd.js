import React, { useState } from 'react';
import { 
  Box,
  Center,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Container
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

function AdminAdd({ userData }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!firstName || !lastName || !email || !salary) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const salaryNum = parseFloat(salary);
    
    if (isNaN(salaryNum) || salaryNum <= 0) {
      setError('Please enter a valid salary amount');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/addEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          salary: salaryNum
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`Employee added successfully with ID: ${data.empId}`);
        // Clear form
        setFirstName('');
        setLastName('');
        setEmail('');
        setSalary('');
      } else {
        setError(data.message || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
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
            maxW="400px" 
            p={8} 
            borderWidth={1} 
            borderRadius="lg" 
            boxShadow="lg"
            bg="white"
          >
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Add New Employee</Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1} color={'black'}>First Name</Text>
                  <Input 
                    color={'black'}
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Enter first name"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Last Name</Text>
                  <Input 
                    color={'black'}
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Enter last name"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Email</Text>
                  <Input 
                    color={'black'}
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email address"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Salary ($)</Text>
                  <Input 
                    color={'black'}
                    type="number"
                    step="0.01" 
                    value={salary} 
                    onChange={(e) => setSalary(e.target.value)} 
                    placeholder="Enter salary amount"
                    required
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
                  Add Employee
                </Button>
                
                <Button 
                  variant="outline"
                  width="full" 
                  onClick={handleBack}
                  color={'black'}
                >
                  Back to Admin Home
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default AdminAdd;