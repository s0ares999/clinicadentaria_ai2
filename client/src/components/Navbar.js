import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../services/auth.service';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
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

function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
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

  return (
    <NavbarContainer>
      <Logo>Clínica Dentária Viseense</Logo>
      <NavLinks>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/sobre">Quem Somos</NavLink>
        <NavLink to="/contactos">Contactos</NavLink>
        {currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN') && (
          <NavLink to="/dashboard">Dashboard</NavLink>
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
    </NavbarContainer>
  );
}

export default Navbar;
