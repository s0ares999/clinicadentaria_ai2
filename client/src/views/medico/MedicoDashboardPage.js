import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MedicoPerfilComponent from './components/MedicoPerfilComponent';
import ConsultasComponent from './components/ConsultasComponent';
import MedicoFaturasPage from './MedicoFaturasPage';
import MedicoHistoricoPage from './MedicoHistoricoPage';
import MarcarConsultaComponent from './components/MarcarConsultaComponent';
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
  top: 75px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 98;

  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
    max-width: 60px;
    left: 0;
    top: 75px;
    height: 100vh;         // <-- cobre toda a altura
    margin-top: 0;         // <-- remove margem extra
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 2rem 2rem 2rem 2rem;
  max-width: 900px;

  @media (max-width: 768px) {
    margin-left: 70px;
    padding: 1rem 0.5rem 2rem 0.5rem;
    max-width: 100%;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
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

  @media (max-width: 768px) {
    padding: 1.2rem 0.5rem;
    gap: 0;
    justify-content: center;
    i {
      margin-right: 0;
      width: 100%;
      font-size: 1.3rem;
    }
    // Esconde o texto
    & > span, & > div {
      display: none !important;
    }
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
    window.location.href = '/';
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
      case 'marcarConsulta':
        return <MarcarConsultaComponent />;
      default:
        return <MedicoPerfilComponent />;
    }
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
            <span>Meu Perfil</span>
          </NavItem>

          <NavItem 
            className={activeTab === 'consultas' ? 'active' : ''} 
            onClick={() => setActiveTab('consultas')}
          >
            <i className="fas fa-calendar-check"></i>
            <span>Consultas</span>
          </NavItem>

          <NavItem 
            className={activeTab === 'marcarConsulta' ? 'active' : ''} 
            onClick={() => setActiveTab('marcarConsulta')}
          >
            <i className="fas fa-plus-circle"></i>
            <span>Marcar Consulta</span>
          </NavItem>

          <NavItem 
            className={activeTab === 'historico' ? 'active' : ''} 
            onClick={() => setActiveTab('historico')}
          >
            <i className="fas fa-history"></i>
            <span>Histórico de Consultas</span>
          </NavItem>

          <NavItem 
            className={activeTab === 'faturas' ? 'active' : ''} 
            onClick={() => setActiveTab('faturas')}
          >
            <i className="fas fa-file-invoice-dollar"></i>
            <span>Gestão de Faturas</span>
          </NavItem>

          <NavItem onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
           <span>Sair</span>
          </NavItem>
        </Sidebar>

        <MainContent>
          <BreadcrumbNav>
            <Link to="/">Início</Link> / Área do Médico / {
              activeTab === 'perfil' ? 'Meu Perfil' :
              activeTab === 'consultas' ? 'Consultas' :
              activeTab === 'marcarConsulta' ? 'Marcar Consulta' :
              activeTab === 'historico' ? 'Histórico de Consultas' :
              activeTab === 'faturas' ? 'Gestão de Faturas' :
              ''
            }
          </BreadcrumbNav>

          <h2>{
            activeTab === 'perfil' ? 'Meu Perfil' :
            activeTab === 'consultas' ? 'Consultas' :
            activeTab === 'marcarConsulta' ? 'Marcar Consulta' :
            activeTab === 'historico' ? 'Histórico de Consultas' :
            activeTab === 'faturas' ? 'Gestão de Faturas' :
            ''
          }</h2>

          {renderContent()}
        </MainContent>
      </PageContainer>
    </>
  );
}

export default MedicoDashboardPage;
