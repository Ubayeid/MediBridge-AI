import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { healthRecords, insuranceInfo } = useAppState();

  return (
    <div>
      <h1>Welcome to MediBridge AI</h1>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Upcoming Appointments"
              value={0}
              suffix={
                <Button type="link" onClick={() => navigate('/appointments')}>
                  View All
                </Button>
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Health Records"
              value={healthRecords.length}
              suffix={
                <Button type="link" onClick={() => navigate('/health-records')}>
                  View All
                </Button>
              }
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Insurance Status"
              value={insuranceInfo ? 'Active' : 'Not Set'}
              suffix={
                <Button type="link" onClick={() => navigate('/insurance')}>
                  Manage
                </Button>
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 