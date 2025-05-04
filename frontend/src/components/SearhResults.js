import React from 'react';
import { 
  Box, Text, Stack, SimpleGrid, Button, Heading 
} from '@chakra-ui/react';

function SearchResults({ searchResults, onViewEmployee }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Box mt={6} pt={4}>
      <Heading size="md" mb={4} textAlign="center" color={'black'}>Search Results</Heading>
      
      <Stack spacing={4}>
        {searchResults.map((employee) => (
          <Box 
            key={employee.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
          >
            <SimpleGrid columns={[1, null, 2]} spacing={4}>
              <Box>
                <Text fontWeight="bold" color={'black'}>ID:</Text>
                <Text color={'black'}>{employee.id}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={'black'}>Name:</Text>
                <Text color={'black'}>{`${employee.firstName} ${employee.lastName}`}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={'black'}>Email:</Text>
                <Text color={'black'}>{employee.email}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={'black'}>Hire Date:</Text>
                <Text color={'black'}>{employee.hireDate}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={'black'}>Salary:</Text>
                <Text color={'black'}>{formatCurrency(employee.salary)}</Text>
              </Box>
            </SimpleGrid>
            <Button 
              size="sm"
              onClick={() => onViewEmployee(employee.id)}
              mt={3}
              width="full"
            >
              Edit Employee
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default SearchResults;