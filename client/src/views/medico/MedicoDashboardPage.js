import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MedicoPerfilComponent from './components/MedicoPerfilComponent';
import ConsultasComponent from './components/ConsultasComponent';
import MedicoFaturasPage from './MedicoFaturasPage';
import MedicoHistoricoPage from './MedicoHistoricoPage';
import AuthService from '../../services/auth.service';
import Navbar from '../../components/Navbar';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f6fa;
  padding-top: 64px;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  position: fixed;
  left: 0;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 98;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  min-height: calc(100vh - 64px);
  background-color: #f5f6fa;

  h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
`;

const ProfileInfo = styled.div`
  flex: 1;

  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .info-item {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
`;

const BreadcrumbNav = styled.nav`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;

  a {
    color: #3498db;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserType = styled.div`
  background-color: #3498db;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: #3498db;
  }

  i {
    width: 20px;
    text-align: center;
  }
`;

function MedicoDashboardPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('perfil');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user || user.tipo !== 'medico') {
      window.location.href = '/login';
      return;
    }
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <MedicoPerfilComponent />;
      case 'consultas':
        return <ConsultasComponent />;
      case 'historico':
        return <MedicoHistoricoPage />;
      case 'faturas':
        return <MedicoFaturasPage />;
      default:
        return <MedicoPerfilComponent />;
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'MD';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ marginTop: '64px', padding: '2rem' }}>
          Carregando...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <Sidebar>
          <NavItem 
            className={activeTab === 'perfil' ? 'active' : ''} 
            onClick={() => setActiveTab('perfil')}
          >
            <i className="fas fa-user"></i>
            Meu Perfil
          </NavItem>

          <NavItem 
            className={activeTab === 'consultas' ? 'active' : ''} 
            onClick={() => setActiveTab('consultas')}
          >
            <i className="fas fa-calendar-check"></i>
            Consultas
          </NavItem>

          <NavItem 
            className={activeTab === 'historico' ? 'active' : ''} 
            onClick={() => setActiveTab('historico')}
          >
            <i className="fas fa-history"></i>
            Histórico de Consultas
          </NavItem>

          <NavItem 
            className={activeTab === 'faturas' ? 'active' : ''} 
            onClick={() => setActiveTab('faturas')}
          >
            <i className="fas fa-file-invoice-dollar"></i>
            Gestão de Faturas
          </NavItem>

          <NavItem onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Sair
          </NavItem>
        </Sidebar>

        <MainContent>
          <BreadcrumbNav>
            <Link to="/">Início</Link> / Área do Médico / {
              activeTab === 'perfil' ? 'Meu Perfil' :
              activeTab === 'consultas' ? 'Consultas' :
              activeTab === 'historico' ? 'Histórico de Consultas' :
              activeTab === 'faturas' ? 'Gestão de Faturas' :
              ''
            }
          </BreadcrumbNav>

          <h2>{
            activeTab === 'perfil' ? 'Meu Perfil' :
            activeTab === 'consultas' ? 'Consultas' :
            activeTab === 'historico' ? 'Histórico de Consultas' :
            activeTab === 'faturas' ? 'Gestão de Faturas' :
            ''
          }</h2>

          <ProfileHeader>
            <Avatar>
              {getInitials(currentUser?.nome)}
            </Avatar>
            <ProfileInfo>
              <h2>Bem-vindo, Dr(a). {currentUser?.nome}</h2>
              <div className="info-item">Email: {currentUser?.email}</div>
              <div className="info-item">CRM: {currentUser?.crm || 'Não informado'}</div>
              <div className="info-item">Especialidade: {currentUser?.especialidade || 'Não informada'}</div>
            </ProfileInfo>
          </ProfileHeader>

          {renderContent()}
        </MainContent>
      </PageContainer>
    </>
  );
}

export default MedicoDashboardPage; 