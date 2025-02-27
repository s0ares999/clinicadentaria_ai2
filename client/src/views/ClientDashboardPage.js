import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthService from '../services/auth.service';

// Componentes para o Dashboard do Cliente
import ClientePerfilPage from './cliente/ClientePerfilPage';
import ClienteAgendamentosPage from './cliente/ClienteAgendamentosPage';
import ClienteHistoricoPage from './cliente/ClienteHistoricoPage';
import ClienteNovoAgendamentoPage from './cliente/ClienteNovoAgendamentoPage';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: #f8f9fa;
  min-height: calc(100vh - 120px);
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem 0;
  height: calc(100vh - 120px);
  position: relative;
  top: 0;
`;

const SidebarHeader = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #34495e;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
`;

const UserName = styled.div`
  font-weight: 600;
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: #bdc3c7;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const MenuItem = styled.li`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-left: 3px solid ${props => props.active ? '#3498db' : 'transparent'};
  background-color: ${props => props.active ? '#34495e' : 'transparent'};

  &:hover {
    background-color: #34495e;
  }

  a {
    text-decoration: none;
    color: #ecf0f1;
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 0.75rem;
    width: 20px;
    text-align: center;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const BreadcrumbNav = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function ClientDashboardPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getActivePath = () => {
    const path = location.pathname;
    if (path === '/cliente-dashboard') return 'perfil';
    if (path.includes('agendamentos') && !path.includes('novo-agendamento')) return 'agendamentos';
    if (path.includes('novo-agendamento')) return 'novo-agendamento';
    if (path.includes('historico')) return 'historico';
    return 'perfil';
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  return (
    <PageContainer>
      <Navbar />
      
      <DashboardContainer>
        <Sidebar>
          <SidebarHeader>
            <UserInfo>
              <UserAvatar>{getInitials(currentUser.username)}</UserAvatar>
              <div>
                <UserName>{currentUser.username}</UserName>
                <UserRole>Cliente</UserRole>
              </div>
            </UserInfo>
          </SidebarHeader>
          
          <SidebarMenu>
            <MenuItem active={getActivePath() === 'perfil'}>
              <Link to="/cliente-dashboard">
                <span className="icon"><i className="fas fa-user"></i></span>
                Meu Perfil
              </Link>
            </MenuItem>
            <MenuItem active={getActivePath() === 'agendamentos'}>
              <Link to="/cliente-dashboard/agendamentos">
                <span className="icon"><i className="fas fa-calendar-alt"></i></span>
                Meus Agendamentos
              </Link>
            </MenuItem>
            <MenuItem active={getActivePath() === 'novo-agendamento'}>
              <Link to="/cliente-dashboard/agendamentos/novo-agendamento">
                <span className="icon"><i className="fas fa-plus"></i></span>
                Novo Agendamento
              </Link>
            </MenuItem>
            <MenuItem active={getActivePath() === 'historico'}>
              <Link to="/cliente-dashboard/historico">
                <span className="icon"><i className="fas fa-history"></i></span>
                Histórico de Consultas
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/" onClick={() => AuthService.logout()}>
                <span className="icon"><i className="fas fa-sign-out-alt"></i></span>
                Sair
              </Link>
            </MenuItem>
          </SidebarMenu>
        </Sidebar>
        
        <MainContent>
          <DashboardHeader>
            <PageTitle>
              {getActivePath() === 'perfil' && 'Meu Perfil'}
              {getActivePath() === 'agendamentos' && 'Meus Agendamentos'}
              {getActivePath() === 'novo-agendamento' && 'Novo Agendamento'}
              {getActivePath() === 'historico' && 'Histórico de Consultas'}
            </PageTitle>
            <BreadcrumbNav>
              <Link to="/">Início</Link> / <span>Área do Cliente</span> / 
              <span>
                {getActivePath() === 'perfil' && ' Meu Perfil'}
                {getActivePath() === 'agendamentos' && ' Meus Agendamentos'}
                {getActivePath() === 'novo-agendamento' && ' Novo Agendamento'}
                {getActivePath() === 'historico' && ' Histórico de Consultas'}
              </span>
            </BreadcrumbNav>
          </DashboardHeader>
          
          <Routes>
            <Route index element={<ClientePerfilPage />} />
            <Route path="agendamentos" element={<ClienteAgendamentosPage />} />
            <Route path="agendamentos/novo-agendamento" element={<ClienteNovoAgendamentoPage />} />
            <Route path="historico" element={<ClienteHistoricoPage />} />
          </Routes>
        </MainContent>
      </DashboardContainer>
      
      <Footer />
    </PageContainer>
  );
}

export default ClientDashboardPage;
