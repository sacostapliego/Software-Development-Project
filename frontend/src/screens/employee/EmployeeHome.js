// Buttons to show the UI options
/* 
System.out.println("Welcome to the User UI!");
        System.out.println("1. View Profile");
        System.out.println("2. View pay history report");
        System.out.println("3. change password");
        System.out.println("4. EXIT");
        System.out.print("Please select an option: "); 
        */

        import React from 'react';
        import { 
          Box, 
          Container, 
          Heading, 
          Button,
          Text,
          VStack,
          Flex,
          Center,
        } from '@chakra-ui/react';
        import { useNavigate } from 'react-router-dom';
        
        function EmployeeHome({ userData, onLogout }) {
          const navigate = useNavigate();
          
          // Handle logout 
          const handleLogout = () => {
            if (onLogout) {
              onLogout();  
            }
            navigate('/login');
          };
          
          // These handlers do nothing
          const handleViewProfile = () => {
        
          };
          
          const handleViewPayHistory = () => {
           
          };
          
          const handleChangePassword = () => {
            
          };
          
          return (
            <Box minH="100vh" bg="gray.50">
              {/* Header */}
              <Box bg="blue.600" color="white" py={4} px={6} mb={6}>
                <Container maxW="container.xl">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Heading size="lg">Employee Management System</Heading>
                    <Flex alignItems="center" gap={4}>
                      <Text>Welcome, {userData?.firstName || 'Employee'}</Text>
                    </Flex>
                  </Flex>
                </Container>
              </Box>
              
              <Container maxW="container.sm">
                <Center>
                  <Box 
                    width="100%" 
                    padding={8} 
                    borderWidth={1} 
                    borderRadius="lg" 
                    boxShadow="lg"
                    bg="white"
                  >
                    <VStack spacing={5} align="stretch">
                        <Heading size="lg" textAlign="center" padding={4} color={'black'} borderColor={'black'} borderBottomWidth={'medium'}>Employee Homepage</Heading>
                      
                      <Button 
                        size="lg" 
                        onClick={handleViewProfile}
                        height="60px"
                      >
                        View Profile
                      </Button>
                      
                      <Button 
                        size="lg" 
                        onClick={handleViewPayHistory}
                        height="60px"
                      >
                        View Pay History
                      </Button>
                      
                      <Button 
                        size="lg" 
                        onClick={handleChangePassword}
                        height="60px"
                      >
                        Change Password
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
        
        export default EmployeeHome;