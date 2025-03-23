import React, { useState } from 'react';
import { Card, Form, DatePicker, TimePicker, Select, Button, Typography, Table, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './EarlySchedule.css';

const { Title } = Typography;
const { Option } = Select;

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  provider: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const demoAppointments: Appointment[] = [
  {
    id: '1',
    type: 'General Checkup',
    date: '2024-03-20',
    time: '10:00 AM',
    provider: 'Dr. Smith',
    status: 'scheduled'
  },
  {
    id: '2',
    type: 'Dental Cleaning',
    date: '2024-03-25',
    time: '2:00 PM',
    provider: 'Dr. Johnson',
    status: 'scheduled'
  }
];

const EarlySchedule: React.FC = () => {
  const [form] = Form.useForm();
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments);

  const handleSchedule = async (values: any) => {
    // In a real app, this would call an API to schedule the appointment
    console.log('Scheduling appointment:', values);
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
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
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
        <Tag color={
          status === 'scheduled' ? 'green' :
          status === 'completed' ? 'blue' :
          'red'
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
  ];

  return (
    <div className="early-schedule">
      <Card>
        <Title level={2}>Early Schedule Appointment</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSchedule}
          className="schedule-form"
        >
          <Form.Item
            name="type"
            label="Appointment Type"
            rules={[{ required: true, message: 'Please select appointment type' }]}
          >
            <Select placeholder="Select appointment type">
              <Option value="checkup">General Checkup</Option>
              <Option value="dental">Dental Cleaning</Option>
              <Option value="vaccination">Vaccination</Option>
              <Option value="consultation">Consultation</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Preferred Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Preferred Time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="provider"
            label="Preferred Provider"
            rules={[{ required: true, message: 'Please select a provider' }]}
          >
            <Select placeholder="Select provider">
              <Option value="dr_smith">Dr. Smith</Option>
              <Option value="dr_johnson">Dr. Johnson</Option>
              <Option value="dr_williams">Dr. Williams</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<CalendarOutlined />}>
              Schedule Appointment
            </Button>
          </Form.Item>
        </Form>

        <div className="appointments-section">
          <Title level={3}>Your Appointments</Title>
          <Table
            columns={columns}
            dataSource={appointments}
            rowKey="id"
            pagination={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default EarlySchedule; 