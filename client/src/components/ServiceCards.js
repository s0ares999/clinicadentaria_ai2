import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

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
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: translateY(${props => (props.isVisible ? 0 : 30)}px);
  transition: opacity 1s ease, transform 1s ease;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 1s ease;

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

const ServiceLink = styled(Link)`
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
      title: "Odontologia Geral",
      icon: "fas fa-tooth",
      description: "Tratamentos completos para manter a sua saúde bucal em dia.",
    },
    {
      title: "Ortodontia",
      icon: "fas fa-teeth",
      description: "Correção do alinhamento dos dentes.",
    },
    {
      title: "Implantes Dentários",
      icon: "fas fa-teeth-open",
      description: "Substitua dentes perdidos com implantes.",
    },
    {
      title: "Endodontia",
      icon: "fas fa-pump-medical",
      description: "Tratamento de canal especializado.",
    },
    {
      title: "Estética Dental",
      icon: "fas fa-smile",
      description: "Procedimentos para melhorar a aparência do seu sorriso.",
    },
    {
      title: "Odontopediatria",
      icon: "fas fa-baby",
      description: "Cuidados dentários especializados para crianças.",
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
          <ServiceCardWithAnimation key={service.title}>
            <ServiceCard>
              <ServiceIcon>
                <i className={service.icon}></i>
              </ServiceIcon>
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceLink to={`/servicos/${service.title.replace(/\s+/g, '-').toLowerCase()}`}>
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </ServiceLink>
              </ServiceContent>
            </ServiceCard>
          </ServiceCardWithAnimation>
        ))}
      </ServicesGrid>
    </ServicesSection>
  );
}

// Componente para animação de entrada e saída nos cartões de serviço
const ServiceCardWithAnimation = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Quando 10% do elemento está visível
    triggerOnce: false, // Para que a animação ocorra várias vezes
  });

  return (
    <div ref={ref}>
      {React.cloneElement(children, { isVisible: inView })}
    </div>
  );
};

export default ServiceCards;
