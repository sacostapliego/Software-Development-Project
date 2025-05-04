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

function EmployeeResetPass({ userData }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    
    try {
      if (!userData || !userData.email) {
        setError('User email is missing. Please log in again.');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          currentPassword,
          newPassword
        }),
      });

      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Password changed successfully!');
        // Clear form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Failed to change password. Please check your current password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/employee');
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
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Change Password</Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1} color={'black'}>Current Password</Text>
                  <Input 
                    color={'black'}
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    placeholder="Enter your current password"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>New Password</Text>
                  <Input 
                    color={'black'}
                    type="password"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="Enter your new password"
                    required
                  />
                </Box>
                
                <Box>
                  <Text mb={1} color={'black'}>Confirm New Password</Text>
                  <Input 
                    color={'black'}
                    type="password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm your new password"
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
                  Change Password
                </Button>
                
                <Button 
                  variant="outline"
                  width="full" 
                  onClick={handleBack}
                  color={'black'}
                >
                  Back to Home
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default EmployeeResetPass;