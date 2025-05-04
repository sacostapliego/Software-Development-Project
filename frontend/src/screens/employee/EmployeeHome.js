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
          
          const handleViewProfile = () => {
            navigate('/employee/profile');
          };
          
          const handleViewPayHistory = () => {
            navigate('/employee/payhistory');
          };
          
          const handleChangePassword = () => {
            navigate('/employee/resetpassword');
          };
          
          return (
            <Flex minH="100vh" bg="gray.50" justifyContent={'center'} alignItems={'center'}>         
              <Container maxW="container.sm" paddingBottom={'5%'}>
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
            </Flex>
          );
        }
        
        export default EmployeeHome;