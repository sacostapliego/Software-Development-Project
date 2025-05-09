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

function AdminBatch({ userData }) {
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [raiseMultiplier, setRaiseMultiplier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!minSalary || !maxSalary || !raiseMultiplier) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const minSalaryNum = parseInt(minSalary);
    const maxSalaryNum = parseInt(maxSalary);
    const raiseMultiplierNum = parseFloat(raiseMultiplier);
    
    if (isNaN(minSalaryNum) || isNaN(maxSalaryNum) || isNaN(raiseMultiplierNum)) {
      setError('Please enter valid numbers');
      setLoading(false);
      return;
    }

    if (minSalaryNum >= maxSalaryNum) {
      setError('Minimum salary must be less than maximum salary');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/batchRaise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          minSalary: minSalaryNum,
          maxSalary: maxSalaryNum,
          raise: raiseMultiplierNum
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Batch raise processed successfully!');
        setMinSalary('');
        setMaxSalary('');
        setRaiseMultiplier('');
      } else {
        setError(data.message || 'Failed to process batch raise');
      }
    } catch (error) {
      console.error('Error processing batch raise:', error);
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
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Batch Salary Raise</Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1} color={'black'}>Minimum Salary ($)</Text>
                  <Input 
                    color={'black'}
                    type="number" 
                    value={minSalary} 
                    onChange={(e) => setMinSalary(e.target.value)} 
                    placeholder="Enter minimum salary"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Maximum Salary ($)</Text>
                  <Input 
                    color={'black'}
                    type="number" 
                    value={maxSalary} 
                    onChange={(e) => setMaxSalary(e.target.value)} 
                    placeholder="Enter maximum salary"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Raise Multiplier</Text>
                  <Input 
                    color={'black'}
                    type="number" 
                    step="0.01" 
                    value={raiseMultiplier} 
                    onChange={(e) => setRaiseMultiplier(e.target.value)} 
                    placeholder="e.g., 1.05 for 5% raise"
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
                  Process Batch Raise
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

export default AdminBatch;