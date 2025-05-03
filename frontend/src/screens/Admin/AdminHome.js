import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Button,
  Text,
  VStack,
  Flex,
  Center
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function AdminHome({ userData, onLogout }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const handleReports = () => {}
  
  const handleBatchRaise = () => {}

  const handleResetPassword = () => {}

  const handleViewEmployees = () => {
    navigate('/admin/employees');
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="blue.600" color="white" py={4} px={6} mb={6}>
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Employee Management System</Heading>
            <Flex alignItems="center" gap={4}>
                <Text>Welcome, Admin</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>
      
      <Container maxW="container.sm" justifyContent={'center'}>
        <Center>
          <Box 
            width="100%" 
            padding={8} 
            borderWidth={1} 
            borderRadius="lg" 
            boxShadow="lg"
            bg="white"
            justifyContent={'center'}
          >
            <VStack spacing={5} align="stretch">
              <Heading size="lg" textAlign="center" padding={4} color={'black'} borderColor={'black'} borderBottomWidth={'medium'}>Admin Homepage</Heading>
              
              <Button 
                size="lg" 
                onClick={handleViewEmployees}
                height="60px"
              >
                View Employees
              </Button>

              <Button 
                size="lg" 
                onClick={handleReports}
                height="60px"
              >
                View Reports
              </Button>
              
              <Button 
                size="lg" 
                onClick={handleBatchRaise}
                height="60px"
              >
                Batch Raise
              </Button>
              
              <Button 
                size="lg" 
                onClick={handleResetPassword}
                height="60px"
              >
                Reset Password
              </Button>
            
              
              <Button 
                size="lg" 
                onClick={handleLogout}
                height="60px"
              >
                Logout
              </Button>
            </VStack>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default AdminHome;