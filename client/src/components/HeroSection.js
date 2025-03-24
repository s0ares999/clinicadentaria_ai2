import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const HeroContainer = styled.div`
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const InnerShadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: inset 0 -10px 20px rgba(0, 0, 0, 0.1);
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
  position: relative;
  opacity: 1;
  transition: opacity 1s ease;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &.primary {
    background-color: #3498db;
    color: #ffffff;

    &:hover {
      background-color: #2980b9;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #333;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);

  h3 {
    margin-bottom: 15px;
    color: #3498db;
  }

  p {
    margin-bottom: 20px;
  }
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e74c3c;
  color: white;
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
`;

function HeroSection() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleConsultaClick = () => {
    try {
      const user = AuthService.getCurrentUser();
      
      // Verifica se o user existe e tem a propriedade tipo
      if (!user) {
        navigate('/login');
        return;
      }

      // Verifica se o user.tipo existe antes de comparar
      if (!user.tipo) {
        setErrorMessage('Erro ao verificar tipo de usuário');
        setTimeout(() => {
          setErrorMessage('');
          navigate('/login');
        }, 3000);
        return;
      }

      // Se for cliente, redireciona para agendamento
      if (user.tipo === 'cliente') {
        navigate('/cliente-dashboard/agendamentos/novo-agendamento');
        return;
      }

      // Se não for cliente, mostra mensagem e redireciona para registro
      setErrorMessage('Apenas clientes podem marcar consultas');
      setTimeout(() => {
        setErrorMessage('');
        navigate('/register');
      }, 3000);

    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      setErrorMessage('Erro ao verificar usuário. Por favor, faça login novamente.');
      setTimeout(() => {
        setErrorMessage('');
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <HeroContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <InnerShadow />
      <HeroContent>
        <HeroTitle>O Seu Sorriso Merece o Melhor Cuidado</HeroTitle>
        <HeroSubtitle>
          Na Clínica Dentária Viseense, combinamos tecnologia avançada e profissionais
          experientes para oferecer tratamentos de excelência para toda a família.
        </HeroSubtitle>
        <ButtonContainer>
          <Button 
            className="primary"
            onClick={handleConsultaClick}
          >
            Marcar Consulta
          </Button>
          <Button 
            className="secondary"
            onClick={() => navigate('/sobre')}
          >
            Conheça-nos Melhor
          </Button>
        </ButtonContainer>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
