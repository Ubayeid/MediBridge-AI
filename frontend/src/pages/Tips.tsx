import React from 'react';
import { Card, Typography, List, Tag, Space } from 'antd';
import { BulbOutlined, HeartOutlined, SafetyCertificateOutlined, DollarOutlined } from '@ant-design/icons';
import './Tips.css';

const { Title, Text } = Typography;

interface Tip {
  id: string;
  title: string;
  category: 'health' | 'safety' | 'cost' | 'general';
  content: string;
  icon: React.ReactNode;
}

const tips: Tip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    category: 'health',
    content: 'Drink at least 8 glasses of water daily to maintain good health and prevent dehydration.',
    icon: <HeartOutlined />
  },
  {
    id: '2',
    title: 'Regular Exercise',
    category: 'health',
    content: 'Engage in at least 30 minutes of moderate exercise 5 times a week to boost your immune system.',
    icon: <HeartOutlined />
  },
  {
    id: '3',
    title: 'Emergency Contacts',
    category: 'safety',
    content: 'Keep a list of emergency contacts including campus health services and local hospitals.',
    icon: <SafetyCertificateOutlined />
  },
  {
    id: '4',
    title: 'Insurance Coverage',
    category: 'cost',
    content: 'Understand your insurance coverage and keep your insurance card with you at all times.',
    icon: <DollarOutlined />
  },
  {
    id: '5',
    title: 'Healthy Diet',
    category: 'health',
    content: 'Maintain a balanced diet with plenty of fruits, vegetables, and whole grains.',
    icon: <HeartOutlined />
  },
  {
    id: '6',
    title: 'Cost-Saving Tips',
    category: 'cost',
    content: 'Use generic medications when possible and take advantage of student health center services.',
    icon: <DollarOutlined />
  }
];

const Tips: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health':
        return 'green';
      case 'safety':
        return 'blue';
      case 'cost':
        return 'orange';
      default:
        return 'default';
    }
  };

  return (
    <div className="tips">
      <Card>
        <Title level={2}>Health & Wellness Tips</Title>
        <Text className="subtitle">Essential tips for maintaining good health while studying abroad</Text>

        <List
          itemLayout="vertical"
          size="large"
          dataSource={tips}
          renderItem={tip => (
            <List.Item
              key={tip.id}
              actions={[
                <Tag color={getCategoryColor(tip.category)} key="category">
                  {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                </Tag>
              ]}
            >
              <List.Item.Meta
                avatar={tip.icon}
                title={tip.title}
                description={tip.content}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Tips; 