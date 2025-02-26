import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const HomePageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const InfoSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${props => props.bgColor || '#ffffff'};
`;

const InfoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 992px) {
    flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const InfoText = styled.p`
  color: #7f8c8d;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const InfoImage = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const CtaSection = styled.section`
  padding: 5rem 2rem;
  background-color: #3498db;
  color: #ffffff;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CtaText = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const CtaButton = styled.button`
  padding: 1rem 2rem;
  background-color: #ffffff;
  color: #3498db;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-5px);
  }
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Navbar />
      <HeroSection />
      
      <InfoSection>
        <InfoContainer>
          <InfoContent>
            <InfoTitle>Cuidados Dentários de Excelência</InfoTitle>
            <InfoText>
              Na Clínica Dentária Viseense, acreditamos que um sorriso saudável é fundamental para o bem-estar 
              e autoestima. Nossa equipe de profissionais altamente qualificados está comprometida em 
              oferecer os melhores tratamentos dentários com tecnologia de ponta e atendimento humanizado.
            </InfoText>
            <InfoText>
              Trabalhamos com uma abordagem preventiva e personalizada, garantindo que cada paciente 
              receba o tratamento mais adequado às suas necessidades específicas, sempre com conforto 
              e segurança.
            </InfoText>
          </InfoContent>
          <InfoImage>
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Equipe de dentistas profissionais"
            />
          </InfoImage>
        </InfoContainer>
      </InfoSection>
      
      <ServiceCards />
      
      <InfoSection bgColor="#f8f9fa">
        <InfoContainer reverse>
          <InfoImage>
            <img 
              src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Tecnologia moderna em consultório dentário"
            />
          </InfoImage>
          <InfoContent>
            <InfoTitle>Tecnologia de Ponta a Seu Serviço</InfoTitle>
            <InfoText>
              Investimos constantemente em equipamentos modernos e tecnologias avançadas para 
              proporcionar diagnósticos precisos e tratamentos eficientes com o máximo conforto.
            </InfoText>
            <InfoText>
              Nosso consultório conta com radiografias digitais, scanners intraorais, microscópios 
              para procedimentos de alta precisão e equipamentos de última geração para garantir 
              a excelência em cada procedimento.
            </InfoText>
          </InfoContent>
        </InfoContainer>
      </InfoSection>
      
      <Testimonials />
      
      <CtaSection>
        <CtaTitle>Agende Sua Consulta Hoje Mesmo</CtaTitle>
        <CtaText>
          Dê o primeiro passo para um sorriso mais saudável e bonito. Nossa equipe está pronta para 
          atendê-lo com toda a atenção e cuidado que você merece.
        </CtaText>
        <CtaButton>Marcar Consulta</CtaButton>
      </CtaSection>
      
      <Footer />
    </HomePageContainer>
  );
}

export default HomePage;
