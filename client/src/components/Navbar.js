import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../services/auth.service';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  justify-content: space-between; /* Espaço entre logo e links */

  @media (max-width: 768px) {
    justify-content: flex-start; /* Alinha os itens à esquerda em mobile */
  }
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
  flex: 0 0 auto; /* Não permite que o logo cresça ou encolha */

  @media (max-width: 768px) {
    text-align: center; /* Centraliza o texto em mobile */
    flex-grow: 1; /* Permite que o logo ocupe o espaço disponível em mobile */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-grow: 1; /* Permite que os links ocupem o espaço disponível */
  justify-content: center; /* Centraliza os links em telas maiores */

  @media (max-width: 768px) {
    display: none; /* Esconde os links em telas menores */
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &.login {
    background-color: #ffffff;
    color: #3498db;
    border: 1px solid #3498db;
  }

  &.register, &.logout {
    background-color: #3498db;
    color: #ffffff;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 4px 0;
    transition: 0.4s;
  }

  @media (max-width: 768px) {
    display: flex; /* Mostra o menu hambúrguer em telas menores */
  }
`;

const MobileNavLinks = styled.div`
  display: none; /* Esconde os links por padrão */

  @media (max-width: 768px) {
    display: flex; /* Mostra os links em mobile quando o menu está aberto */
    flex-direction: column;
    position: absolute;
    top: 60px; /* Ajuste conforme necessário */
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 1;
  }
`;

function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  return (
    <NavbarContainer>
      <Hamburger onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </Hamburger>
      <Logo>Clínica Dentária Viseense</Logo>
      <NavLinks>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Quem Somos</NavLink>
        <NavLink to="/contactos">Contactos</NavLink>
        {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        {currentUser && currentUser.role === 'cliente' && (
          <NavLink to="/cliente-dashboard">Área do Cliente</NavLink>
        )}
      </NavLinks>
      <AuthButtons>
        {currentUser ? (
          <>
            <span style={{ marginRight: '10px', alignSelf: 'center' }}>
              Olá, {currentUser.username}
            </span>
            <Button className="logout" onClick={handleLogout}>
              Sair
            </Button>
          </>
        ) : (
          <>
            <Button className="login" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button className="register" onClick={() => navigate('/register')}>
              Registar
            </Button>
          </>
        )}
      </AuthButtons>
      <MobileNavLinks style={{ display: isMenuOpen ? 'flex' : 'none' }}>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Quem Somos</NavLink>
        <NavLink to="/contactos">Contactos</NavLink>
        {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        {currentUser && currentUser.role === 'cliente' && (
          <NavLink to="/cliente-dashboard">Área do Cliente</NavLink>
        )}
      </MobileNavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
