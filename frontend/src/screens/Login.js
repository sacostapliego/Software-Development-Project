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
import { API_BASE_URL } from '../App';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // hardcoded admin login
      if (email === "admin@example" && password === "password") {
        onLoginSuccess({
          success: true,
          isAdmin: true,
          empid: 1
        });
        return;
      }
      
      // Normal login flow
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data); // Pass user data to App component
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Z Employee System</Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1} color={'black'}>Email</Text>
                  <Input 
                    color={'black'}
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Password</Text>
                  <Input 
                    color={'black'}
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password"
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
                  isLoading={loading}
                  mt={2}
                >
                  Sign In
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default Login;