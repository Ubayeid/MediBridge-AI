import React, { useState } from 'react';
import { Card, Select, Tag, Tooltip } from 'antd';
import { EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './CampusMap.css';

interface HealthcareFacility {
  id: string;
  name: string;
  university: string;
  type: 'dental' | 'wellness' | 'mental' | 'general';
  address: string;
  distance: number;
  services: string[];
  availability: 'open' | 'closed';
  rating: number;
}

const demoFacilities: HealthcareFacility[] = [
  {
    id: '1',
    name: 'University Health Center',
    university: 'State University',
    type: 'general',
    address: '123 University Ave, City, State',
    distance: 0.5,
    services: ['General Checkups', 'Vaccinations', 'Lab Tests'],
    availability: 'open',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Dental Clinic',
    university: 'City College',
    type: 'dental',
    address: '456 College Blvd, City, State',
    distance: 1.2,
    services: ['Cleanings', 'Fillings', 'Emergency Care'],
    availability: 'open',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Counseling Center',
    university: 'Community College',
    type: 'mental',
    address: '789 Campus Drive, City, State',
    distance: 2.0,
    services: ['Individual Therapy', 'Group Sessions', 'Crisis Support'],
    availability: 'open',
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Wellness Center',
    university: 'State University',
    type: 'wellness',
    address: '321 Health Street, City, State',
    distance: 0.8,
    services: ['Nutrition Counseling', 'Fitness Classes', 'Stress Management'],
    availability: 'closed',
    rating: 4.6,
  },
];

const CampusMap: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('all');

  const universities = Array.from(new Set(demoFacilities.map(f => f.university)));
  const types = Array.from(new Set(demoFacilities.map(f => f.type)));

  const filteredFacilities = demoFacilities.filter(facility => {
    const typeMatch = selectedType === 'all' || facility.type === selectedType;
    const universityMatch = selectedUniversity === 'all' || facility.university === selectedUniversity;
    return typeMatch && universityMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dental':
        return 'blue';
      case 'wellness':
        return 'green';
      case 'mental':
        return 'purple';
      case 'general':
        return 'orange';
      default:
        return 'default';
    }
  };

  return (
    <Card className="campus-map">
      <div className="map-header">
        <h2><EnvironmentOutlined /> Cross-Campus Healthcare Services</h2>
        <div className="map-filters">
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={setSelectedType}
            options={[
              { value: 'all', label: 'All Services' },
              ...types.map(type => ({
                value: type,
                label: type.charAt(0).toUpperCase() + type.slice(1),
              })),
            ]}
          />
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={setSelectedUniversity}
            options={[
              { value: 'all', label: 'All Universities' },
              ...universities.map(uni => ({
                value: uni,
                label: uni,
              })),
            ]}
          />
        </div>
      </div>

      <div className="facilities-grid">
        {filteredFacilities.map(facility => (
          <Card key={facility.id} className="facility-card">
            <div className="facility-header">
              <h3>{facility.name}</h3>
              <Tag color={facility.availability === 'open' ? 'success' : 'error'}>
                {facility.availability === 'open' ? 'Open' : 'Closed'}
              </Tag>
            </div>
            
            <div className="facility-info">
              <p><strong>University:</strong> {facility.university}</p>
              <p><strong>Distance:</strong> {facility.distance} miles</p>
              <p><strong>Address:</strong> {facility.address}</p>
              <p><strong>Rating:</strong> {facility.rating} / 5.0</p>
            </div>

            <div className="facility-services">
              <h4>Available Services:</h4>
              <div className="service-tags">
                {facility.services.map(service => (
                  <Tag key={service} color={getTypeColor(facility.type)}>
                    {service}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="facility-actions">
              <Tooltip title="Get directions">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(facility.address)}`} target="_blank" rel="noopener noreferrer">
                  <EnvironmentOutlined /> Get Directions
                </a>
              </Tooltip>
              <Tooltip title="More information">
                <a href="#">
                  <InfoCircleOutlined /> Learn More
                </a>
              </Tooltip>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default CampusMap; 