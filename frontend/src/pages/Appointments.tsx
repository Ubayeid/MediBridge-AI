import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, DatePicker, TimePicker, Table, Tag, Modal, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import './Appointments.css';
import { FormGroup } from '../components/common/Form';

const { Title } = Typography;
const { Option } = Select;

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  provider: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const demoAppointments: Appointment[] = [
  {
    id: '1',
    type: 'General Checkup',
    date: '2024-03-15',
    time: '10:00',
    provider: 'Dr. Sarah Johnson',
    location: 'University Health Center',
    status: 'scheduled',
    notes: 'Annual physical examination'
  },
  {
    id: '2',
    type: 'Dental Cleaning',
    date: '2024-03-20',
    time: '14:30',
    provider: 'Dr. Michael Chen',
    location: 'Campus Dental Clinic',
    status: 'scheduled'
  },
  {
    id: '3',
    type: 'Vaccination',
    date: '2024-02-28',
    time: '09:00',
    provider: 'Nurse Emily Brown',
    location: 'Student Health Services',
    status: 'completed',
    notes: 'Flu shot administered'
  }
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [form] = Form.useForm();

  const handleAddAppointment = () => {
    setEditingAppointment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    form.setFieldsValue(appointment);
    setIsModalVisible(true);
  };

  const handleDeleteAppointment = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this appointment?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setAppointments(appointments.filter(apt => apt.id !== id));
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newAppointment: Appointment = {
        id: editingAppointment?.id || String(appointments.length + 1),
        ...values,
        status: 'scheduled'
      };

      if (editingAppointment) {
        setAppointments(appointments.map(apt => 
          apt.id === editingAppointment.id ? newAppointment : apt
        ));
      } else {
        setAppointments([...appointments, newAppointment]);
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
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'scheduled' ? 'blue' :
          status === 'completed' ? 'green' :
          'red'
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <div className="appointment-actions">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditAppointment(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAppointment(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="appointments">
      <div className="appointments-header">
        <Title level={2}>Appointments</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddAppointment}
        >
          Schedule Appointment
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
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
            label="Appointment Type"
            rules={[{ required: true, message: 'Please select appointment type' }]}
          >
            <Select placeholder="Select appointment type">
              <Option value="General Checkup">General Checkup</Option>
              <Option value="Dental Cleaning">Dental Cleaning</Option>
              <Option value="Vaccination">Vaccination</Option>
              <Option value="Specialist Consultation">Specialist Consultation</Option>
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
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please select time' }]}
          >
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="provider"
            label="Healthcare Provider"
            rules={[{ required: true, message: 'Please enter provider name' }]}
          >
            <Input placeholder="Enter provider name" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={4} placeholder="Enter any additional notes" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments; 