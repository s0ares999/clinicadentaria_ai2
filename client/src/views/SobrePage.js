import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 2rem;
`;

const HeroSection = styled.section`
  background-color: #3498db;
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
`;

const Column = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    color: #7f8c8d;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const TeamSection = styled.section`
  padding: 5rem 2rem;
  background-color: #f8f9fa;
`;

const TeamTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
`;

const TeamSubtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamMember = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .info {
    padding: 1.5rem;
    text-align: center;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
  }

  p {
    margin: 0 0 1rem;
    color: #3498db;
    font-weight: 500;
  }

  .social {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .social a {
    color: #7f8c8d;
    transition: color 0.3s;
  }

  .social a:hover {
    color: #3498db;
  }
`;

function SobrePage() {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Carlos Oliveira",
      role: "Odontologia Geral & Estética",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      id: 2,
      name: "Dra. Ana Ferreira",
      role: "Ortodontia",
      image: "https://randomuser.me/api/portraits/women/90.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      id: 3,
      name: "Dr. Miguel Costa",
      role: "Implantologia",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      id: 4,
      name: "Dra. Sofia Martins",
      role: "Odontopediatria",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#"
      }
    }
  ];

  return (
    <PageContainer>
      <Navbar />
      
      <MainContent>
        <HeroSection>
          <HeroTitle>Quem Somos</HeroTitle>
          <HeroSubtitle>
            Conheça a história da Clínica Dentária Viseense, nossa missão, visão e os valores 
            que guiam nosso compromisso com a saúde bucal dos nossos pacientes.
          </HeroSubtitle>
        </HeroSection>
        
        <ContentSection>
          <SectionTitle>Nossa História</SectionTitle>
          <TwoColumns>
            <Column>
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80" 
                alt="Clínica Dentária fachada"
              />
              <h3>O Início</h3>
              <p>
                A Clínica Dentária Viseense foi fundada em 2005 pelo Dr. Pedro Soares com a visão de criar um 
                espaço que combinasse tecnologia avançada e atendimento humanizado. O que começou como um 
                pequeno consultório com apenas dois profissionais, cresceu e se tornou uma referência em 
                saúde bucal na região.
              </p>
              <p>
                Ao longo dos anos, investimos constantemente em formação contínua de nossa equipe 
                e em equipamentos de última geração para oferecer sempre o melhor tratamento aos 
                nossos pacientes.
              </p>
            </Column>
            
            <Column>
              <h3>Missão</h3>
              <p>
                Proporcionar cuidados dentários de excelência, melhorando a saúde bucal e a qualidade 
                de vida dos nossos pacientes através de tratamentos personalizados, com ética, 
                responsabilidade e uso das mais avançadas tecnologias.
              </p>
              
              <h3>Visão</h3>
              <p>
                Ser reconhecida como referência em odontologia de qualidade, inovando constantemente 
                nos tratamentos e serviços oferecidos, com uma equipe altamente qualificada e 
                comprometida com o bem-estar dos pacientes.
              </p>
              
              <h3>Valores</h3>
              <p>
                • Excelência técnica e humanização no atendimento<br />
                • Ética e transparência em todas as relações<br />
                • Compromisso com resultados e satisfação do paciente<br />
                • Inovação e aprendizado contínuo<br />
                • Acessibilidade e respeito à diversidade<br />
                • Sustentabilidade e responsabilidade social
              </p>
            </Column>
          </TwoColumns>
        </ContentSection>
        
        <TeamSection>
          <TeamTitle>Nossa Equipe</TeamTitle>
          <TeamSubtitle>
            Conheça os profissionais dedicados e altamente qualificados que 
            trabalham para cuidar do seu sorriso.
          </TeamSubtitle>
          <TeamGrid>
            {teamMembers.map(member => (
              <TeamMember key={member.id}>
                <img src={member.image} alt={member.name} />
                <div className="info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <div className="social">
                    <a href={member.social.linkedin} aria-label="LinkedIn">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href={member.social.twitter} aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={member.social.facebook} aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                </div>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
}

export default SobrePage;
