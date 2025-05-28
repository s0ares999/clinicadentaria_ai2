import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../../services/auth.service';

const TopbarContainer = styled.div`
  background-color: #ffffff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  left: ${({ sidebarWidth }) => sidebarWidth};
  z-index: 10;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px 15px;
  width: 300px;

  @media (max-width: 992px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #2c3e50;
  }

  i {
    color: #7f8c8d;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const Notifications = styled.div`
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  
  i {
    font-size: 1.2rem;
    color: #2c3e50;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  }

  .user-info {
    display: none;
    
    @media (min-width: 768px) {
      display: block;
    }
    
    .name {
      font-weight: 500;
      color: #2c3e50;
    }
    
    .role {
      font-size: 0.8rem;
      color: #7f8c8d;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 45px;
    right: 0;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    z-index: 10;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'block' : 'none')};

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px 15px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #f5f5f5;
        }

        a, button {
          color: #2c3e50;
          text-decoration: none;
          background: none;
          border: none;
          font-size: 0.9rem;
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: 0;
          display: flex;
          align-items: center;

          i {
            margin-right: 10px;
            width: 15px;
          }
        }

        &.divider {
          border-top: 1px solid #ecf0f1;
          margin: 5px 0;
          padding: 0;
        }

        &.logout button {
          color: #e74c3c;
        }
      }
    }
  }
`;

const Topbar = ({ toggleSidebar, sidebarWidth }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <TopbarContainer sidebarWidth={sidebarWidth}>
      <MenuToggle onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </MenuToggle>

      <SearchBar>
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Pesquisar..." />
      </SearchBar>

      <UserMenu>

        <UserProfile isMenuOpen={isMenuOpen} onClick={toggleMenu}>
          <div className="avatar">
            {getInitials(user?.username)}
          </div>
          <div className="user-info">
            <div className="name">{user?.username}</div>
            <div className="role">Administrador</div>
          </div>
          <div className="dropdown-menu">
            <ul>
              <li>
                <a href="#profile">
                  <i className="fas fa-user"></i> Perfil
                </a>
              </li>
              <li>
                <a href="#settings">
                  <i className="fas fa-cog"></i> Configurações
                </a>
              </li>
              <li className="divider"></li>
              <li className="logout">
                <button onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </UserProfile>
      </UserMenu>
    </TopbarContainer>
  );
};

export default Topbar;
