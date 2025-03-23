import React, { useState } from 'react';
import { Card, Table, Button, Upload, Modal, Form, Input, Select, Tag, message } from 'antd';
import { UploadOutlined, ShareAltOutlined, LockOutlined, FileTextOutlined } from '@ant-design/icons';
import './HealthRecordHub.css';

interface HealthRecord {
  id: string;
  title: string;
  type: 'medical' | 'dental' | 'lab' | 'vaccination' | 'other';
  date: string;
  provider: string;
  status: 'active' | 'archived';
  sharedWith: string[];
  lastAccessed: string;
}

const demoRecords: HealthRecord[] = [
  {
    id: '1',
    title: 'Annual Physical Exam',
    type: 'medical',
    date: '2024-02-15',
    provider: 'University Health Center',
    status: 'active',
    sharedWith: ['Dr. Smith', 'Dental Clinic'],
    lastAccessed: '2024-02-20',
  },
  {
    id: '2',
    title: 'Blood Test Results',
    type: 'lab',
    date: '2024-01-30',
    provider: 'LabCorp',
    status: 'active',
    sharedWith: ['Dr. Johnson'],
    lastAccessed: '2024-02-01',
  },
  {
    id: '3',
    title: 'Dental Cleaning',
    type: 'dental',
    date: '2023-12-10',
    provider: 'Campus Dental Clinic',
    status: 'archived',
    sharedWith: [],
    lastAccessed: '2023-12-15',
  },
  {
    id: '4',
    title: 'COVID-19 Vaccination',
    type: 'vaccination',
    date: '2023-11-05',
    provider: 'University Health Center',
    status: 'active',
    sharedWith: ['Dr. Smith'],
    lastAccessed: '2024-01-15',
  },
];

const HealthRecordHub: React.FC = () => {
  const [records, setRecords] = useState<HealthRecord[]>(demoRecords);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: HealthRecord) => (
        <div className="record-title">
          <FileTextOutlined />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Shared With',
      dataIndex: 'sharedWith',
      key: 'sharedWith',
      render: (sharedWith: string[]) => (
        <div className="shared-with">
          {sharedWith.map((provider, index) => (
            <Tag key={index} color="blue">
              {provider}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Last Accessed',
      dataIndex: 'lastAccessed',
      key: 'lastAccessed',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: HealthRecord) => (
        <div className="record-actions">
          <Button
            type="link"
            icon={<ShareAltOutlined />}
            onClick={() => handleShare(record)}
          >
            Share
          </Button>
          <Button
            type="link"
            icon={<LockOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medical':
        return 'blue';
      case 'dental':
        return 'green';
      case 'lab':
        return 'purple';
      case 'vaccination':
        return 'orange';
      default:
        return 'default';
    }
  };

  const handleUpload = () => {
    setIsUploadModalVisible(true);
  };

  const handleShare = (record: HealthRecord) => {
    setSelectedRecord(record);
    setIsShareModalVisible(true);
  };

  const handleView = (record: HealthRecord) => {
    message.info('Viewing secure record...');
    // Implement secure viewing logic
  };

  const handleUploadSubmit = (values: any) => {
    const newRecord: HealthRecord = {
      id: String(records.length + 1),
      title: values.title,
      type: values.type,
      date: new Date().toISOString().split('T')[0],
      provider: values.provider,
      status: 'active',
      sharedWith: [],
      lastAccessed: new Date().toISOString().split('T')[0],
    };

    setRecords([...records, newRecord]);
    setIsUploadModalVisible(false);
    form.resetFields();
    message.success('Record uploaded successfully');
  };

  const handleShareSubmit = (values: any) => {
    if (selectedRecord) {
      const updatedRecords = records.map(record =>
        record.id === selectedRecord.id
          ? { ...record, sharedWith: [...record.sharedWith, values.provider] }
          : record
      );
      setRecords(updatedRecords);
      setIsShareModalVisible(false);
      form.resetFields();
      message.success('Record shared successfully');
    }
  };

  return (
    <Card className="health-record-hub">
      <div className="hub-header">
        <h2><FileTextOutlined /> Health Record Hub</h2>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={handleUpload}
        >
          Upload Record
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={records}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Upload Health Record"
        open={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUploadSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Select>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="dental">Dental</Select.Option>
              <Select.Option value="lab">Lab</Select.Option>
              <Select.Option value="vaccination">Vaccination</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="provider"
            label="Provider"
            rules={[{ required: true, message: 'Please enter a provider' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Upload
            </Button>
            <Button onClick={() => setIsUploadModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Share Health Record"
        open={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleShareSubmit}>
          <Form.Item
            name="provider"
            label="Share with Provider"
            rules={[{ required: true, message: 'Please enter a provider name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Share
            </Button>
            <Button onClick={() => setIsShareModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default HealthRecordHub; 