import React from 'react';
import { Box, Typography } from '@mui/material';

const Appointments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Typography variant="body1">
        Coming soon: Schedule and manage your medical appointments with smart scheduling.
      </Typography>
    </Box>
  );
};

export default Appointments; 