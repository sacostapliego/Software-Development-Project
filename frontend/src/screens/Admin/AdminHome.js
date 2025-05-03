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
    <Flex minH="100vh" bg="gray.50" justifyContent={'center'} alignItems={'center'}>
      <Container maxW="container.sm"  justifyContent={'center'} paddingBottom={'5%'}>
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
    </Flex>
  );
}

export default AdminHome;