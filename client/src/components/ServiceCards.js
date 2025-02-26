import React from 'react';
import styled from 'styled-components';

const ServicesSection = styled.section`
  padding: 5rem 2rem;
  background-color: #ffffff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: #3498db;
  padding: 2rem 0;
  text-align: center;
  background-color: #ecf0f1;
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const ServiceDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ServiceLink = styled.a`
  display: inline-block;
  color: #3498db;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #2980b9;
  }

  i {
    margin-left: 0.5rem;
  }
`;

function ServiceCards() {
  const services = [
    {
      id: 1,
      icon: "fas fa-tooth",
      title: "Odontologia Geral",
      description: "Tratamentos completos para manter a sua saúde bucal em dia, incluindo limpeza, restaurações e extrações simples.",
      link: "#"
    },
    {
      id: 2,
      icon: "fas fa-teeth",
      title: "Ortodontia",
      description: "Correção do alinhamento dos dentes e problemas de mordida com aparelhos ortodônticos modernos e discretos.",
      link: "#"
    },
    {
      id: 3,
      icon: "fas fa-teeth-open",
      title: "Implantes Dentários",
      description: "Substitua dentes perdidos com implantes de alta qualidade que parecem e funcionam como dentes naturais.",
      link: "#"
    },
    {
      id: 4,
      icon: "fas fa-pump-medical",
      title: "Endodontia",
      description: "Tratamento de canal especializado para preservar dentes com infecções ou danos na polpa dentária.",
      link: "#"
    },
    {
      id: 5,
      icon: "fas fa-smile",
      title: "Estética Dental",
      description: "Procedimentos para melhorar a aparência do seu sorriso, incluindo clareamento, facetas e restaurações estéticas.",
      link: "#"
    },
    {
      id: 6,
      icon: "fas fa-baby",
      title: "Odontopediatria",
      description: "Cuidados dentários especializados para crianças, com abordagem lúdica e ambiente acolhedor.",
      link: "#"
    }
  ];

  return (
    <ServicesSection>
      <SectionTitle>Nossos Serviços</SectionTitle>
      <SectionSubtitle>
        Oferecemos uma ampla gama de tratamentos dentários para cuidar da saúde e estética do seu sorriso.
      </SectionSubtitle>
      <ServicesGrid>
        {services.map(service => (
          <ServiceCard key={service.id}>
            <ServiceIcon>
              <i className={service.icon}></i>
            </ServiceIcon>
            <ServiceContent>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceLink href={service.link}>
                Saiba mais <i className="fas fa-arrow-right"></i>
              </ServiceLink>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesSection>
  );
}

export default ServiceCards;
