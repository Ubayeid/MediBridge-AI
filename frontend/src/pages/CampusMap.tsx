import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const CampusMap: React.FC = () => {
  return (
    <div className="page-container">
      <Card>
        <Title level={2}>Campus Map</Title>
        <p>This feature is coming soon. You'll be able to view and navigate through the campus map here.</p>
      </Card>
    </div>
  );
};

export default CampusMap; 