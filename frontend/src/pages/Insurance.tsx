import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Upload, Table, Tag, Typography, Progress, Modal } from 'antd';
import { UploadOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import './Insurance.css';
import { FormGroup } from '../components/common/Form';

const { Title } = Typography;
const { Option } = Select;

interface InsuranceInfo {
  id: string;
  provider: string;
  planType: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  coverage: {
    medical: number;
    dental: number;
    vision: number;
  };
}

const demoInsurance: InsuranceInfo[] = [
  {
    id: '1',
    provider: 'Student Health Insurance',
    planType: 'Comprehensive',
    policyNumber: 'SHI-2024-001',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    coverage: {
      medical: 80,
      dental: 60,
      vision: 50
    }
  },
  {
    id: '2',
    provider: 'International Student Insurance',
    planType: 'Basic',
    policyNumber: 'ISI-2024-002',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    coverage: {
      medical: 70,
      dental: 40,
      vision: 30
    }
  }
];

const Insurance: React.FC = () => {
  const [insurance, setInsurance] = useState<InsuranceInfo[]>(demoInsurance);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingInsurance, setEditingInsurance] = useState<InsuranceInfo | null>(null);
  const [form] = Form.useForm();

  const handleAddInsurance = () => {
    setEditingInsurance(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditInsurance = (insurance: InsuranceInfo) => {
    setEditingInsurance(insurance);
    form.setFieldsValue(insurance);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newInsurance: InsuranceInfo = {
        id: editingInsurance?.id || String(insurance.length + 1),
        ...values,
        status: 'active'
      };

      if (editingInsurance) {
        setInsurance(insurance.map(ins => 
          ins.id === editingInsurance.id ? newInsurance : ins
        ));
      } else {
        setInsurance([...insurance, newInsurance]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Plan Type',
      dataIndex: 'planType',
      key: 'planType',
    },
    {
      title: 'Policy Number',
      dataIndex: 'policyNumber',
      key: 'policyNumber',
    },
    {
      title: 'Coverage',
      key: 'coverage',
      render: (record: InsuranceInfo) => (
        <div className="coverage-info">
          <div className="coverage-item">
            <span>Medical:</span>
            <Progress percent={record.coverage.medical} size="small" />
          </div>
          <div className="coverage-item">
            <span>Dental:</span>
            <Progress percent={record.coverage.dental} size="small" />
          </div>
          <div className="coverage-item">
            <span>Vision:</span>
            <Progress percent={record.coverage.vision} size="small" />
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'active' ? 'green' :
          status === 'expired' ? 'red' :
          'orange'
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: InsuranceInfo) => (
        <div className="insurance-actions">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditInsurance(record)}
          />
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={() => console.log('Download insurance card')}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="insurance">
      <div className="insurance-header">
        <Title level={2}>Insurance Information</Title>
        <Button
          type="primary"
          onClick={handleAddInsurance}
        >
          Add Insurance
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={insurance}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingInsurance ? 'Edit Insurance' : 'Add New Insurance'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="provider"
            label="Insurance Provider"
            rules={[{ required: true, message: 'Please enter insurance provider' }]}
          >
            <Input placeholder="Enter insurance provider" />
          </Form.Item>

          <Form.Item
            name="planType"
            label="Plan Type"
            rules={[{ required: true, message: 'Please select plan type' }]}
          >
            <Select placeholder="Select plan type">
              <Option value="Comprehensive">Comprehensive</Option>
              <Option value="Basic">Basic</Option>
              <Option value="Premium">Premium</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="policyNumber"
            label="Policy Number"
            rules={[{ required: true, message: 'Please enter policy number' }]}
          >
            <Input placeholder="Enter policy number" />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Insurance Card"
            name="insuranceCard"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Insurance Card</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Insurance; 