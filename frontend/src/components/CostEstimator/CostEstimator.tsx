import React, { useState } from 'react';
import { Card, Input, Button, Table, Tag, Space, message } from 'antd';
import { SearchOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Treatment {
  id: string;
  name: string;
  code: string;
  estimatedCost: number;
  insuranceCoverage: number;
  outOfPocket: number;
}

interface Facility {
  id: string;
  name: string;
  distance: number;
  cost: number;
  rating: number;
}

const CostEstimator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);

  const treatmentColumns: ColumnsType<Treatment> = [
    {
      title: 'Treatment',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (code) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: 'Estimated Cost',
      dataIndex: 'estimatedCost',
      key: 'estimatedCost',
      render: (cost) => `$${cost.toLocaleString()}`,
    },
    {
      title: 'Insurance Coverage',
      dataIndex: 'insuranceCoverage',
      key: 'insuranceCoverage',
      render: (coverage) => `$${coverage.toLocaleString()}`,
    },
    {
      title: 'Out of Pocket',
      dataIndex: 'outOfPocket',
      key: 'outOfPocket',
      render: (cost) => <strong>${cost.toLocaleString()}</strong>,
    },
  ];

  const facilityColumns: ColumnsType<Facility> = [
    {
      title: 'Facility',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
      render: (distance) => `${distance} miles`,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => `$${cost.toLocaleString()}`,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => {
        const color = rating >= 4 ? 'green' : rating >= 3 ? 'orange' : 'red';
        return <Tag color={color}>{rating}/5</Tag>;
      },
    },
  ];

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    try {
      // TODO: Implement API call to search treatments
      // Mock data
      const mockTreatments: Treatment[] = [
        {
          id: '1',
          name: 'General Consultation',
          code: 'GC001',
          estimatedCost: 150,
          insuranceCoverage: 120,
          outOfPocket: 30,
        },
        {
          id: '2',
          name: 'Basic Blood Test',
          code: 'LAB001',
          estimatedCost: 200,
          insuranceCoverage: 160,
          outOfPocket: 40,
        },
      ];
      setTreatments(mockTreatments);
    } catch (error) {
      message.error('Failed to search treatments');
    } finally {
      setLoading(false);
    }
  };

  const handleFacilitySearch = async () => {
    if (!zipCode || treatments.length === 0) return;
    
    setLoading(true);
    try {
      // TODO: Implement API call to search facilities
      // Mock data
      const mockFacilities: Facility[] = [
        {
          id: '1',
          name: 'City Medical Center',
          distance: 2.5,
          cost: 150,
          rating: 4.5,
        },
        {
          id: '2',
          name: 'University Hospital',
          distance: 5.1,
          cost: 130,
          rating: 4.2,
        },
      ];
      setFacilities(mockFacilities);
    } catch (error) {
      message.error('Failed to search facilities');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card title="Cost Estimator" className="card">
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex gap-4">
            <Input
              placeholder="Search for treatments or procedures"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              className="flex-1"
            />
            <Button
              type="primary"
              onClick={handleSearch}
              loading={loading}
              icon={<DollarOutlined />}
            >
              Estimate Cost
            </Button>
          </div>
          
          {treatments.length > 0 && (
            <>
              <Table
                columns={treatmentColumns}
                dataSource={treatments}
                rowKey="id"
                pagination={false}
              />
              
              <div className="flex gap-4 mt-4">
                <Input
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  prefix={<EnvironmentOutlined />}
                  className="max-w-xs"
                />
                <Button
                  type="primary"
                  onClick={handleFacilitySearch}
                  loading={loading}
                >
                  Find Facilities
                </Button>
              </div>
            </>
          )}
          
          {facilities.length > 0 && (
            <Table
              columns={facilityColumns}
              dataSource={facilities}
              rowKey="id"
              pagination={false}
              className="mt-4"
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default CostEstimator; 