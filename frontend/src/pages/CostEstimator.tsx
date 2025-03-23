import React from 'react';
import { Box, Typography } from '@mui/material';

const CostEstimator: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Healthcare Cost Estimator
      </Typography>
      <Typography variant="body1">
        Coming soon: Estimate costs for doctor visits, treatments, tests, and medications.
      </Typography>
    </Box>
  );
};

export default CostEstimator; 