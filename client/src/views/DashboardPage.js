import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const DashboardContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding-top: 70px;
  min-height: 100vh;
  background-color: #f4f6f9;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '250px' : '0')};
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent sidebarOpen={sidebarOpen}>
        <Topbar 
          toggleSidebar={toggleSidebar} 
          sidebarWidth={sidebarOpen ? '250px' : '0'}
        />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
