import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  MessageOutlined,
  DollarOutlined,
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Dashboard from './components/Dashboard/Dashboard';
import ChatBot from './components/ChatBot/ChatBot';
import CostEstimator from './components/CostEstimator/CostEstimator';
import logo from './assets/logo.svg';
import './index.css';
import './components/layout/Layout.css';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const navigationItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: 'chatbot',
      icon: <MessageOutlined />,
      label: <Link to="/chat">AI Assistant</Link>,
    },
    {
      key: 'cost-estimator',
      icon: <DollarOutlined />,
      label: <Link to="/cost-estimator">Cost Estimator</Link>,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <Router>
      <Layout className="min-h-screen">
        <Header className="header">
          <div className="header-logo">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMobileMenu}
              className="lg:hidden text-white"
            />
            <img src={logo} alt="MediBridge AI" />
            <h1 className="text-white text-xl font-semibold hidden sm:block">
              MediBridge AI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar
                icon={<UserOutlined />}
                className="bg-primary-700 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
            className={`sider ${mobileMenuVisible ? 'mobile-visible' : ''}`}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              className="h-full border-0"
              items={navigationItems}
            />
          </Sider>
          <Layout className="content-layout">
            <Content className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<ChatBot />} />
                <Route path="/cost-estimator" element={<CostEstimator />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App; 