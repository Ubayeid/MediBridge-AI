import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to MediBridge AI
      </Typography>
      <Typography variant="body1">
        Your AI-powered healthcare assistant for managing healthcare costs, appointments, and more.
      </Typography>
    </Box>
  );
};

export default Dashboard; 