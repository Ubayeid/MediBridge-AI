import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Typography, Steps, Result } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './SymptomChecker.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SymptomChecker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: 'Select Symptoms',
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="symptoms"
            label="What symptoms are you experiencing?"
            rules={[{ required: true, message: 'Please select at least one symptom' }]}
          >
            <Select mode="multiple" placeholder="Select symptoms">
              <Option value="fever">Fever</Option>
              <Option value="headache">Headache</Option>
              <Option value="cough">Cough</Option>
              <Option value="sore_throat">Sore Throat</Option>
              <Option value="body_pain">Body Pain</Option>
              <Option value="fatigue">Fatigue</Option>
              <Option value="nausea">Nausea</Option>
              <Option value="diarrhea">Diarrhea</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Additional Details',
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="duration"
            label="How long have you been experiencing these symptoms?"
            rules={[{ required: true, message: 'Please select duration' }]}
          >
            <Select placeholder="Select duration">
              <Option value="less_than_24h">Less than 24 hours</Option>
              <Option value="1_3_days">1-3 days</Option>
              <Option value="4_7_days">4-7 days</Option>
              <Option value="more_than_7_days">More than 7 days</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="severity"
            label="How severe are your symptoms?"
            rules={[{ required: true, message: 'Please select severity' }]}
          >
            <Select placeholder="Select severity">
              <Option value="mild">Mild</Option>
              <Option value="moderate">Moderate</Option>
              <Option value="severe">Severe</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="notes"
            label="Additional Notes"
          >
            <TextArea rows={4} placeholder="Any other relevant information..." />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Results',
      content: (
        <Result
          status="success"
          icon={<CheckCircleOutlined />}
          title="Based on your symptoms"
          subTitle="Here are our recommendations:"
          extra={[
            <Button type="primary" key="schedule">
              Schedule Appointment
            </Button>,
            <Button key="home">
              Return to Home
            </Button>,
          ]}
        >
          <div className="recommendations">
            <h3>Recommended Actions:</h3>
            <ul>
              <li>Rest and stay hydrated</li>
              <li>Monitor your symptoms</li>
              <li>Take over-the-counter medications as needed</li>
              <li>Seek medical attention if symptoms worsen</li>
            </ul>
          </div>
        </Result>
      ),
    },
  ];

  return (
    <div className="symptom-checker">
      <Card>
        <Title level={2}>Symptom Checker</Title>
        <Steps current={currentStep} items={steps} />
        <div className="steps-content">
          {steps[currentStep].content}
        </div>
        <div className="steps-action">
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handleBack}>
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SymptomChecker; 