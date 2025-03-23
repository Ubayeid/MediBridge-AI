import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Typography, Table, Tag } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import './CostEstimator.css';

const { Title } = Typography;
const { Option } = Select;

interface CostEstimate {
  service: string;
  baseCost: number;
  insuranceCoverage: number;
  outOfPocket: number;
}

const demoEstimates: CostEstimate[] = [
  {
    service: 'General Checkup',
    baseCost: 150,
    insuranceCoverage: 80,
    outOfPocket: 30
  },
  {
    service: 'Blood Test',
    baseCost: 200,
    insuranceCoverage: 70,
    outOfPocket: 60
  },
  {
    service: 'X-Ray',
    baseCost: 300,
    insuranceCoverage: 75,
    outOfPocket: 75
  }
];

const CostEstimator: React.FC = () => {
  const [form] = Form.useForm();
  const [estimates, setEstimates] = useState<CostEstimate[]>(demoEstimates);

  const handleCalculate = async (values: any) => {
    // In a real app, this would call an API to calculate costs
    console.log('Calculating costs for:', values);
  };

  const columns = [
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Base Cost',
      key: 'baseCost',
      render: (record: CostEstimate) => `$${record.baseCost}`,
    },
    {
      title: 'Insurance Coverage',
      key: 'insuranceCoverage',
      render: (record: CostEstimate) => `${record.insuranceCoverage}%`,
    },
    {
      title: 'Out of Pocket',
      key: 'outOfPocket',
      render: (record: CostEstimate) => `$${record.outOfPocket}`,
    },
  ];

  return (
    <div className="cost-estimator">
      <Card>
        <Title level={2}>Cost Estimator</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCalculate}
          className="cost-form"
        >
          <Form.Item
            name="service"
            label="Select Service"
            rules={[{ required: true, message: 'Please select a service' }]}
          >
            <Select placeholder="Select a medical service">
              <Option value="checkup">General Checkup</Option>
              <Option value="blood_test">Blood Test</Option>
              <Option value="xray">X-Ray</Option>
              <Option value="vaccination">Vaccination</Option>
              <Option value="dental">Dental Cleaning</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please select a location' }]}
          >
            <Select placeholder="Select location">
              <Option value="campus">Campus Health Center</Option>
              <Option value="local">Local Hospital</Option>
              <Option value="clinic">Private Clinic</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<CalculatorOutlined />}>
              Calculate Cost
            </Button>
          </Form.Item>
        </Form>

        <div className="estimates-section">
          <Title level={3}>Recent Estimates</Title>
          <Table
            columns={columns}
            dataSource={estimates}
            rowKey="service"
            pagination={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default CostEstimator; 