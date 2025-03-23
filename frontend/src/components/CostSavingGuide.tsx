import React, { useState } from 'react';
import { Card, Tabs, Tag, List, Button, Tooltip } from 'antd';
import { InfoCircleOutlined, DollarOutlined, MedicineBoxOutlined, HeartOutlined } from '@ant-design/icons';
import './CostSavingGuide.css';

interface CostSavingTip {
  id: string;
  title: string;
  description: string;
  category: 'medication' | 'preventive' | 'insurance' | 'general';
  estimatedSavings: string;
  priority: 'high' | 'medium' | 'low';
}

const demoTips: CostSavingTip[] = [
  {
    id: '1',
    title: 'Use Generic Medications',
    description: 'Ask your healthcare provider about generic alternatives for your prescriptions. Generic medications can cost 80-85% less than brand-name drugs.',
    category: 'medication',
    estimatedSavings: '$50-200 per prescription',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Schedule Regular Checkups',
    description: 'Preventive care is often fully covered by insurance. Regular checkups can help catch health issues early, preventing costly treatments later.',
    category: 'preventive',
    estimatedSavings: '$500-1000 annually',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Use Urgent Care Instead of ER',
    description: 'For non-life-threatening conditions, urgent care centers are significantly cheaper than emergency rooms.',
    category: 'general',
    estimatedSavings: '$200-500 per visit',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Compare Prescription Prices',
    description: 'Use our prescription price comparison tool to find the best prices at local pharmacies.',
    category: 'medication',
    estimatedSavings: '$20-100 per prescription',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Stay In-Network',
    description: 'Always choose healthcare providers within your insurance network to avoid higher out-of-pocket costs.',
    category: 'insurance',
    estimatedSavings: '$100-300 per visit',
    priority: 'high',
  },
  {
    id: '6',
    title: 'Use Student Health Services',
    description: 'Take advantage of free or low-cost services available at your university\'s health center.',
    category: 'general',
    estimatedSavings: '$50-150 per visit',
    priority: 'high',
  },
];

const CostSavingGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medication':
        return <MedicineBoxOutlined />;
      case 'preventive':
        return <HeartOutlined />;
      case 'insurance':
        return <DollarOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const filteredTips = activeTab === 'all'
    ? demoTips
    : demoTips.filter(tip => tip.category === activeTab);

  return (
    <Card className="cost-saving-guide">
      <div className="guide-header">
        <h2><DollarOutlined /> Cost-Saving Tips & Resources</h2>
        <p className="subtitle">Personalized recommendations to help you save on healthcare costs</p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'all', label: 'All Tips' },
          { key: 'medication', label: 'Medications' },
          { key: 'preventive', label: 'Preventive Care' },
          { key: 'insurance', label: 'Insurance' },
          { key: 'general', label: 'General Tips' },
        ]}
      />

      <List
        dataSource={filteredTips}
        renderItem={tip => (
          <List.Item className="tip-item">
            <Card className="tip-card">
              <div className="tip-header">
                <div className="tip-title">
                  {getCategoryIcon(tip.category)}
                  <h3>{tip.title}</h3>
                </div>
                <Tag color={getPriorityColor(tip.priority)}>
                  {tip.priority.charAt(0).toUpperCase() + tip.priority.slice(1)} Priority
                </Tag>
              </div>
              
              <p className="tip-description">{tip.description}</p>
              
              <div className="tip-footer">
                <div className="estimated-savings">
                  <DollarOutlined />
                  <span>Estimated Savings: {tip.estimatedSavings}</span>
                </div>
                <Tooltip title="Learn more about this tip">
                  <Button type="link" icon={<InfoCircleOutlined />}>
                    Learn More
                  </Button>
                </Tooltip>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CostSavingGuide; 