import React, { useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Container,
  Spinner,
  Textarea
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../App';

function AdminReports({ userData }) {
  const [reportType, setReportType] = useState('');
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState('');
  const navigate = useNavigate();

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport('');

    try {
      let url = `${API_BASE_URL}/reports/${reportType}`;
      
      // For reports that need a month parameter
      if ((reportType === 'division' || reportType === 'job') && !month) {
        setError('Month is required for this report type');
        setLoading(false);
        return;
      }

      // Add month parameter to URL if needed
      if (reportType === 'division' || reportType === 'job') {
        url += `?month=${month}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.report) {
        setReport(data.report);
      } else {
        setError('No report data received');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setError('An error occurred while generating the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  const renderMonthField = () => {
    if (reportType === 'division' || reportType === 'job') {
      return (
        <Box>
          <Text mb={1} color={'black'}>Month (YYYY-MM)</Text>
          <Input
            color={'black'}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="e.g., 2024-05"
            pattern="\d{4}-\d{2}"
          />
        </Box>
      );
    }
    return null;
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container>
        <Center minH="100vh">
          <Box 
            w="100%" 
            maxW="700px" 
            p={8} 
            borderWidth={1} 
            borderRadius="lg" 
            boxShadow="lg"
            bg="white"
          >
            <Heading mb={6} textAlign="center" size="lg" color={'black'}>Generate Reports</Heading>
            
            <form onSubmit={handleGenerateReport}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1} color={'black'}>Report Type</Text>
                  <Box
                    as="select"
                    width="100%"
                    p={2}
                    borderWidth={1}
                    borderRadius="md"
                    color="black"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    background={'white'}
                  >
                    <option value="" disabled>Select report type</option>
                    <option value="fulltime">1. Full Time Employee Report</option>
                    <option value="division">2. Division Payroll Report</option>
                    <option value="job">3. Job Title Payroll Report</option>
                  </Box>
                </Box>

                {renderMonthField()}

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
                  disabled={!reportType}
                  mt={2}
                >
                  Generate Report
                </Button>
              </Stack>
            </form>

            {loading ? (
              <Center my={8}>
                <Spinner size="xl" color="blue.500" />
              </Center>
            ) : report ? (
              <Box mt={6}>
                <Heading size="md" mb={4} textAlign="center" color={'black'}>Report Results</Heading>
                <Textarea
                  value={report}
                  readOnly
                  fontSize="sm"
                  height="300px"
                  fontFamily="monospace"
                  color="black"
                  whiteSpace="pre"
                  overflowY="scroll"
                />
              </Box>
            ) : null}
            
            <Button 
              variant="outline"
              width="full" 
              onClick={handleBack}
              color={'black'}
              mt={4}
            >
              Back to Admin Home
            </Button>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default AdminReports;