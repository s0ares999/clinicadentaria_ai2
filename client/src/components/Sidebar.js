import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarItem = styled(Link)`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  background-color: ${props => props.active ? 'var(--primary-background)' : 'transparent'};
  border-left: ${props => props.active ? '4px solid var(--primary-color)' : 'none'};
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-background);
    border-left: 4px solid var(--primary-color);
  }

  i {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  const location = useLocation();

  const clienteLinks = [
    { to: "/cliente-dashboard/perfil", icon: "user", text: "Meu Perfil" },
    { to: "/cliente-dashboard/agendamentos", icon: "calendar-check", text: "Meus Agendamentos" },
    { to: "/cliente-dashboard/historico", icon: "history", text: "Histórico de Consultas" },
    { to: "/cliente-dashboard/faturas", icon: "file-invoice", text: "Minhas Faturas" },
  ];

  return (
    <div>
      {/* Remover a duplicação de links, manter apenas um */}
      <SidebarItem 
        to="/cliente-dashboard/historico"
        active={location.pathname === '/cliente-dashboard/historico'}
      >
        <i className="fas fa-history"></i>
        Histórico de Consultas
        
      </SidebarItem>
      
      {/* Outros itens do menu */}
    </div>
  );
};

export default Sidebar; 