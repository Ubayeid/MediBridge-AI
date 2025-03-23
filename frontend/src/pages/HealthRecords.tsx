import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Typography, Table, Tag, Upload, DatePicker, Modal } from 'antd';
import { UploadOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './HealthRecords.css';

const { Title } = Typography;
const { Option } = Select;

interface HealthRecord {
  id: string;
  type: string;
  date: string;
  provider: string;
  description: string;
  attachments: string[];
}

const demoRecords: HealthRecord[] = [
  {
    id: '1',
    type: 'Vaccination',
    date: '2024-01-15',
    provider: 'Dr. Smith',
    description: 'Annual flu shot',
    attachments: ['vaccination_record.pdf']
  },
  {
    id: '2',
    type: 'Blood Test',
    date: '2024-02-01',
    provider: 'Dr. Johnson',
    description: 'Complete blood count',
    attachments: ['blood_test_results.pdf']
  }
];

const HealthRecords: React.FC = () => {
  const [form] = Form.useForm();
  const [records, setRecords] = useState<HealthRecord[]>(demoRecords);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);

  const handleAddRecord = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditRecord = (record: HealthRecord) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newRecord: HealthRecord = {
        id: editingRecord?.id || String(records.length + 1),
        ...values
      };

      if (editingRecord) {
        setRecords(records.map(record => 
          record.id === editingRecord.id ? newRecord : record
        ));
      } else {
        setRecords([...records, newRecord]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: HealthRecord) => (
        <div className="record-actions">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditRecord(record)}
          />
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={() => console.log('Download record')}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRecord(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="health-records">
      <Card>
        <div className="records-header">
          <Title level={2}>Health Records</Title>
          <Button type="primary" onClick={handleAddRecord}>
            Add Record
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={records}
          rowKey="id"
          pagination={false}
        />

        <Modal
          title={editingRecord ? 'Edit Record' : 'Add New Record'}
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
              name="type"
              label="Record Type"
              rules={[{ required: true, message: 'Please select record type' }]}
            >
              <Select placeholder="Select record type">
                <Option value="Vaccination">Vaccination</Option>
                <Option value="Blood Test">Blood Test</Option>
                <Option value="X-Ray">X-Ray</Option>
                <Option value="Prescription">Prescription</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="provider"
              label="Healthcare Provider"
              rules={[{ required: true, message: 'Please enter provider name' }]}
            >
              <Input placeholder="Enter provider name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter record description" />
            </Form.Item>

            <Form.Item
              label="Attachments"
              name="attachments"
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Upload Files</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default HealthRecords; 