import React, { useState } from 'react';
import { 
  Box, Input, Button, Text, Stack
} from '@chakra-ui/react';

function SearchForm({ onSearch, loading, success }) {
  const [searchType, setSearchType] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = { searchType: '' };

    switch (searchType) {
      case 'id':
        requestBody.searchType = 'id';
        requestBody.value = parseInt(employeeId);
        break;
      case 'name':
        requestBody.searchType = 'name';
        requestBody.firstName = firstName;
        requestBody.lastName = lastName;
        break;
      case 'ssn':
        requestBody.searchType = 'ssn';
        requestBody.value = ssn;
        break;
      case 'dob':
        requestBody.searchType = 'dob';
        requestBody.value = dob;
        break;
      default:
        return;
    }

    onSearch(requestBody);
  };

  const renderSearchField = () => {
    switch (searchType) {
      case 'id':
        return (
          <Box>
            <Text mb={1} color={'black'}>Employee ID</Text>
            <Input
              color={'black'}
              type="number"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter employee ID"
            />
          </Box>
        );
      case 'name':
        return (
          <>
            <Box>
              <Text mb={1} color={'black'}>First Name</Text>
              <Input
                color={'black'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </Box>
            <Box>
              <Text mb={1} color={'black'}>Last Name</Text>
              <Input
                color={'black'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </Box>
          </>
        );
      case 'ssn':
        return (
          <Box>
            <Text mb={1} color={'black'}>SSN</Text>
            <Input
              color={'black'}
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              placeholder="Enter SSN (e.g., 123-45-6789)"
            />
          </Box>
        );
      case 'dob':
        return (
          <Box>
            <Text mb={1} color={'black'}>Date of Birth</Text>
            <Input
              color={'black'}
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Box>
          <Text mb={1} color={'black'}>Search Criteria</Text>
          <Box
            as="select"
            width="100%"
            p={2}
            borderWidth={1}
            borderRadius="md"
            color="black"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            background={'white'}
          >
            <option value="" disabled>Select search criteria</option>
            <option value="id">1. Employee ID</option>
            <option value="name">2. Name</option>
            <option value="ssn">3. SSN</option>
            <option value="dob">4. Date of Birth</option>
          </Box>
        </Box>

        {renderSearchField()}
        
        {success && (
          <Text color="green.500" fontSize="sm">
            {success}
          </Text>
        )}

        <Button 
          width="full" 
          type="submit" 
          isLoading={loading}
          disabled={!searchType}
          mt={2}
          border={'1px solid black'}
        >
          Search
        </Button>
      </Stack>
    </form>
  );
}

export default SearchForm;