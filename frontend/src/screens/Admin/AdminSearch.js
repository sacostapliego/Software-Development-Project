import React, { useState } from 'react';
import { 
  Box, Center, Heading, Button, Text, Stack, Container
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../App';
import SearchResults from '../../components/SearhResults';
import SearchForm from '../../components/SearchFrom';

function AdminSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (searchData) => {
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`${API_BASE_URL}/searchEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
        setSuccess(data.length === 0 ? 'No employees found.' : `Found ${data.length} employee(s).`);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error searching employees:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate('/admin/employees');
  
  const handleViewEmployee = (employeeId) => {
    navigate('/admin/updateemployee', { state: { empId: employeeId } });
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.md">
        <Center minH="100vh" py={8}>
          <Box w="100%" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Search Employees</Heading>
            
            <SearchForm onSearch={handleSearch} loading={loading} success={success} />

            {searched && searchResults.length > 0 && (
              <SearchResults 
                searchResults={searchResults} 
                onViewEmployee={handleViewEmployee} 
              />
            )}
            
            <Button 
              variant="outline"
              width="full" 
              onClick={handleBack}
              color={'black'}
              mt={4}
            >
              Back to All Employees
            </Button>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default AdminSearch;