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

function AdminResetPass({ userData }) {
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!employeeId) {
      setError('Employee ID is required');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empid: parseInt(employeeId)
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Password reset successfully for employee ID: ' + employeeId);
        setEmployeeId('');
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
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
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Reset Employee Password</Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1} color={'black'}>Employee ID</Text>
                  <Input 
                    color={'black'}
                    value={employeeId} 
                    onChange={(e) => setEmployeeId(e.target.value)} 
                    placeholder="Enter employee ID"
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
                  Reset Password
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

export default AdminResetPass;