import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

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

function HeroSection() {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>O Seu Sorriso Merece o Melhor Cuidado</HeroTitle>
        <HeroSubtitle>
          Na Clínica Dentária Viseense, combinamos tecnologia avançada e profissionais
          experientes para oferecer tratamentos de excelência para toda a família.
        </HeroSubtitle>
        <ButtonContainer>
          <Button 
            className="primary"
            onClick={() => navigate('/contactos')}
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
