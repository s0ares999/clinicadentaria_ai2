import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #2c3e50;
  color: #ecf0f1;
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
    z-index: 1000;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #34495e;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: #ecf0f1;
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;

    &:hover {
      background-color: #34495e;
    }

    &.active {
      background-color: #34495e;
      border-left-color: #3498db;
    }

    i {
      margin-right: 10px;
      font-size: 1.2rem;
      width: 20px;
      text-align: center;
    }
  }
`;

const SidebarFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #34495e;
  position: absolute;
  bottom: 0;
  width: 84%;

  p {
    margin: 0;
    font-size: 0.8rem;
    color: #7f8c8d;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo>Clínica Admin</Logo>
        <CloseButton onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </CloseButton>
      </SidebarHeader>
      <SidebarMenu>
        <MenuItem>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard/GestaoMedico" className={location.pathname.includes('/dashboard/GestaoMedico') ? 'active' : ''}>
            <i className="fas fa-users"></i> Gestão de Medicos
          </Link>
        </MenuItem>
         <MenuItem>
          <Link to="/dashboard/GestaoClientes" className={location.pathname.includes('/dashboard/GestaoClientes') ? 'active' : ''}>
            <i className="fas fa-users"></i> Gestão de Clientes
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard/GestaoServicos" className={location.pathname.includes('/dashboard/GestaoServicos') ? 'active' : ''}>
            <i className="fas fa-concierge-bell"></i> Gestão de Serviços
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard/agendamentos" className={location.pathname.includes('/dashboard/agendamentos') ? 'active' : ''}>
            <i className="fas fa-calendar-alt"></i> Agendamentos
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard/faturas" className={location.pathname.includes('/dashboard/faturas') ? 'active' : ''}>
            <i className="fas fa-file-invoice-dollar"></i> Faturas
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-globe"></i> Ver Site
          </Link>
        </MenuItem>
      </SidebarMenu>

      <SidebarFooter>
        <p>&copy; {new Date().getFullYear()} Clínica Dentária</p>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
