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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: flex-start;
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
      console.log("Current user in Navbar:", user); // Debug log
      
      // Decodificar o token JWT para garantir que temos o role
      const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
      };
      
      // Se o token está disponível, pegar o role dele
      if (user.accessToken) {
        const decodedToken = parseJwt(user.accessToken);
        console.log("Token decodificado:", decodedToken);
        
        // Atualizar o user com o role do token se ele existir
        if (decodedToken && decodedToken.role) {
          user.role = decodedToken.role;
        }
      }
      
      console.log("User após processamento:", user);
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

  // Função para determinar se o usuário é cliente
  const isClientUser = (user) => {
    console.log("Checking if user is client:", user);
    // Se não tiver usuário, return false
    if (!user) return false;
    
    // Forçar true para testes - REMOVER DEPOIS
    //return true;
    
    return user && (
      user.role === 'cliente' || 
      user.tipo === 'cliente' || 
      (user.tipoUtilizador && user.tipoUtilizador.nome === 'cliente') ||
      (user.isCliente === true)
    );
  };

  // Adicione esta função para verificar se é médico
  const isMedicoUser = (user) => {
    if (!user) return false;
    return user.tipo === 'medico' || 
           (user.tipoUtilizador && user.tipoUtilizador.nome === 'medico');
  };

  return (
    <NavbarContainer>
      <Hamburger onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </Hamburger>
      <Logo>
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" style={{ width: '90%', height: '40px', objectFit: 'contain' }} />
        </Link>
      </Logo>
      <NavLinks>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Quem Somos</NavLink>
        <NavLink to="/contactos">Contactos</NavLink>
        {currentUser && (currentUser.role === 'admin' || currentUser.tipo === 'admin') && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        {isClientUser(currentUser) && (
          <NavLink to="/cliente-dashboard">Área do Cliente</NavLink>
        )}
        {isMedicoUser(currentUser) && (
          <NavLink to="/medico">Dashboard Médico</NavLink>
        )}
      </NavLinks>
      <MobileNavLinks style={{ display: isMenuOpen ? 'flex' : 'none' }}>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Quem Somos</NavLink>
        <NavLink to="/contactos">Contactos</NavLink>
        {currentUser && (currentUser.role === 'admin' || currentUser.tipo === 'admin') && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        {isClientUser(currentUser) && (
          <NavLink to="/cliente-dashboard">Área do Cliente</NavLink>
        )}
        {isMedicoUser(currentUser) && (
          <NavLink to="/medico">Dashboard Médico</NavLink>
        )}
      </MobileNavLinks>
      <AuthButtons>
        {currentUser ? (
          <>
            <span style={{ marginRight: '10px', alignSelf: 'center' }}>
              Olá, {currentUser.username || currentUser.nome}
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
    </NavbarContainer>
  );
}

export default Navbar;
