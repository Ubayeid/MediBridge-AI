import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const CostSavingGuide: React.FC = () => {
  return (
    <div className="page-container">
      <Card>
        <Title level={2}>Cost Saving Guide</Title>
        <p>This feature is coming soon. You'll find tips and strategies for saving on healthcare costs here.</p>
      </Card>
    </div>
  );
};

export default CostSavingGuide; 