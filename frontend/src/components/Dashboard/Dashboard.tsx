import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, List, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { UserOutlined, CalendarOutlined, FileTextOutlined, DollarOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { Appointment, HealthRecord, InsuranceInfo, AppointmentType } from '../../types';

const { Option } = Select;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo | null>(null);
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch data from API
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulated data for now
      setAppointments([
        {
          id: '1',
          type: 'checkup',
          date: new Date().toISOString(),
          status: 'scheduled',
          doctor: 'Dr. Smith',
          location: 'Main Hospital'
        }
      ]);

      setHealthRecords([
        {
          id: '1',
          type: 'Blood Test',
          date: new Date().toISOString(),
          provider: 'Lab Corp',
          notes: 'Normal results'
        }
      ]);

      setInsuranceInfo({
        provider: 'Blue Cross Blue Shield',
        policyNumber: 'BCBS123456',
        groupNumber: 'GROUP789',
        coverage: {
          copay: 20,
          deductible: 1000,
          coinsurance: 0.2
        }
      });
    } catch (error) {
      message.error('Failed to fetch dashboard data');
    }
  };

  const handleAppointmentSubmit = async (values: { type: AppointmentType; date: string; notes?: string }) => {
    try {
      // TODO: Implement API call to create appointment
      message.success('Appointment scheduled successfully');
      setIsAppointmentModalVisible(false);
      form.resetFields();
      fetchDashboardData();
    } catch (error) {
      message.error('Failed to schedule appointment');
    }
  };

  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Upcoming Appointments"
              value={appointments.length}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Health Records"
              value={healthRecords.length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Insurance Coverage"
              value={insuranceInfo?.provider || 'Not Set'}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Medications"
              value={0}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="Upcoming Appointments">
            <List
              dataSource={appointments}
              renderItem={appointment => (
                <List.Item>
                  <List.Item.Meta
                    title={appointment.type}
                    description={`${new Date(appointment.date).toLocaleDateString()} - ${appointment.doctor}`}
                  />
                  <Button type="primary" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                    View Details
                  </Button>
                </List.Item>
              )}
            />
            <Button type="primary" onClick={() => setIsAppointmentModalVisible(true)}>
              Schedule New Appointment
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Health Records">
            <List
              dataSource={healthRecords}
              renderItem={record => (
                <List.Item>
                  <List.Item.Meta
                    title={record.type}
                    description={`${new Date(record.date).toLocaleDateString()} - ${record.provider}`}
                  />
                  <Button type="primary" onClick={() => navigate(`/health-records/${record.id}`)}>
                    View Details
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Schedule New Appointment"
        open={isAppointmentModalVisible}
        onCancel={() => setIsAppointmentModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAppointmentSubmit}>
          <Form.Item
            name="type"
            label="Appointment Type"
            rules={[{ required: true, message: 'Please select appointment type' }]}
          >
            <Select>
              <Option value="checkup">General Checkup</Option>
              <Option value="specialist">Specialist Visit</Option>
              <Option value="followup">Follow-up</Option>
              <Option value="emergency">Emergency</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Preferred Date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Additional Notes"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Schedule
            </Button>
            <Button onClick={() => setIsAppointmentModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard; 