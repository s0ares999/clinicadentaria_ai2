// client/src/components/ServiceDetailPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Função para remover acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Estilização usando styled-components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #2980b9;
  margin-bottom: 1rem;

  &:hover {
    color: #1a5276;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center; /* Centraliza o título */
  text-transform: capitalize; /* Apenas a primeira letra de cada palavra em maiúscula */
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2980b9;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-transform: capitalize; /* Apenas a primeira letra de cada palavra em maiúscula */
`;

const Details = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
`;

const BenefitsList = styled.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  color: #34495e;
`;

const BenefitItem = styled.li`
  margin-bottom: 0.5rem;
`;

const IconContainer = styled.div`
  font-size: 3rem; /* Tamanho do ícone */
  text-align: center; /* Centraliza o ícone */
  margin-bottom: 1rem; /* Espaçamento abaixo do ícone */
  color: #2980b9; /* Cor azul para os ícones */
`;

const ServiceDetailPage = () => {
  const { title } = useParams(); // Obter o título do serviço da URL
  const navigate = useNavigate(); // Hook para navegação

  // Aqui você pode buscar os detalhes do serviço com base no título
  const services = [
    {
      title: "odontologia-geral",
      description: "Tratamentos completos para manter a sua saúde bucal em dia.",
      details: "A odontologia geral abrange uma variedade de serviços, incluindo limpeza, restaurações, extrações e exames regulares. Nossos dentistas estão equipados para lidar com todas as suas necessidades de saúde bucal.",
      benefits: [
        "Prevenção de doenças bucais",
        "Melhoria da saúde geral",
        "Tratamentos personalizados"
      ],
      additionalInfo: "A consulta regular com um dentista é essencial para manter a saúde bucal. Recomendamos visitas a cada seis meses.",
      icon: "fas fa-tooth",
    },
    {
      title: "ortodontia",
      description: "Correção do alinhamento dos dentes.",
      details: "A ortodontia é especializada na correção de dentes e mandíbulas desalinhados. Usamos aparelhos modernos e discretos para garantir que você tenha um sorriso bonito e saudável.",
      benefits: [
        "Melhora na estética do sorriso",
        "Facilita a higiene bucal",
        "Reduz o risco de problemas dentários futuros"
      ],
      additionalInfo: "Os tratamentos ortodônticos podem durar de 6 meses a 2 anos, dependendo da complexidade do caso.",
      icon: "fas fa-teeth",
    },
    {
      title: "implantes-dentarios",
      description: "Substitua dentes perdidos com implantes.",
      details: "Os implantes dentários são uma solução permanente para dentes perdidos. Eles são projetados para se parecer e funcionar como dentes naturais, proporcionando conforto e funcionalidade.",
      benefits: [
        "Solução duradoura",
        "Melhora na mastigação",
        "Aumenta a autoestima"
      ],
      additionalInfo: "Os implantes são feitos de titânio, um material biocompatível que se integra ao osso.",
      icon: "fas fa-teeth-open",
    },
    {
      title: "endodontia",
      description: "Tratamento de canal especializado.",
      details: "A endodontia é o tratamento de problemas relacionados à polpa dentária. Nossos especialistas garantem que você esteja confortável durante todo o processo.",
      benefits: [
        "Alívio da dor",
        "Preservação do dente natural",
        "Tratamento eficaz"
      ],
      additionalInfo: "O tratamento de canal pode salvar um dente que, de outra forma, precisaria ser extraído.",
      icon: "fas fa-pump-medical",
    },
    {
      title: "estetica-dental",
      description: "Procedimentos para melhorar a aparência do seu sorriso.",
      details: "A estética dental inclui uma variedade de tratamentos, como clareamento, facetas e restaurações estéticas, para ajudar você a alcançar o sorriso dos seus sonhos.",
      benefits: [
        "Sorriso mais brilhante",
        "Aumento da confiança",
        "Resultados personalizados"
      ],
      additionalInfo: "Os tratamentos estéticos são personalizados para atender às suas necessidades e desejos específicos.",
      icon: "fas fa-smile",
    },
    {
      title: "odontopediatria",
      description: "Cuidados dentários especializados para crianças.",
      details: "A odontopediatria é focada na saúde bucal de crianças e adolescentes. Criamos um ambiente acolhedor e divertido para que as crianças se sintam confortáveis durante as consultas.",
      benefits: [
        "Cuidados preventivos",
        "Educação sobre higiene bucal",
        "Tratamentos adaptados para crianças"
      ],
      additionalInfo: "As consultas regulares ajudam a estabelecer hábitos saudáveis desde cedo.",
      icon: "fas fa-baby",
    }
  ];

  // Verifique se o título está correto e faça a busca
  const service = services.find(s => removeAccents(s.title) === removeAccents(title)); // Encontrar o serviço pelo título

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>&larr; Voltar</BackButton> {/* Botão de voltar */}
      {service ? (
        <>
          <IconContainer>
            <i className={service.icon}></i> {/* Renderizando o ícone como uma classe */}
          </IconContainer>
          <Title>{service.title.replace(/-/g, ' ')}</Title> {/* Título formatado */}
          <Description>{service.description}</Description>
          <SectionTitle>Detalhes</SectionTitle>
          <Details>{service.details}</Details>
          <SectionTitle>Benefícios</SectionTitle>
          <BenefitsList>
            {service.benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <i className={service.icon}></i> {benefit} {/* Renderizando o ícone associado ao serviço */}
              </BenefitItem>
            ))}
          </BenefitsList>
          <SectionTitle>Informações Adicionais</SectionTitle>
          <Details>{service.additionalInfo}</Details>
        </>
      ) : (
        <p>Serviço não encontrado.</p>
      )}
    </Container>
  );
};

export default ServiceDetailPage;