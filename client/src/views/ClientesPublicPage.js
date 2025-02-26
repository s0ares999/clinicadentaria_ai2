import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const HeroSection = styled.div`
  background-color: #f8f9fa;
  padding: 60px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

const FormSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2c3e50;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      border-color: #3498db;
      outline: none;
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ServicesSection = styled.div`
  margin-bottom: 40px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  p {
    color: #7f8c8d;
    line-height: 1.6;
  }
  
  .icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 15px;
  }
`;

const ClientesPublicPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    dataPreferida: '',
    horaPreferida: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/agendamentos/solicitar`, formData);
      toast.success('Solicitação enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        servico: '',
        dataPreferida: '',
        horaPreferida: '',
        mensagem: ''
      });
    } catch (error) {
      toast.error('Erro ao enviar solicitação. Por favor, tente novamente.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const services = [
    {
      icon: 'tooth',
      title: 'Limpeza Dentária',
      description: 'Remoção de tártaro e placa bacteriana para manter a saúde bucal.'
    },
    {
      icon: 'teeth',
      title: 'Tratamento de Canal',
      description: 'Procedimento para tratar infecções na polpa do dente.'
    },
    {
      icon: 'smile',
      title: 'Clareamento Dental',
      description: 'Procedimento estético para deixar os dentes mais brancos.'
    },
    {
      icon: 'crown',
      title: 'Coroas e Pontes',
      description: 'Restaurações para dentes danificados ou substituição de dentes ausentes.'
    },
    {
      icon: 'tooth-alt',
      title: 'Implantes Dentários',
      description: 'Solução permanente para substituir dentes perdidos.'
    },
    {
      icon: 'teeth-open',
      title: 'Ortodontia',
      description: 'Correção do alinhamento dos dentes e problemas de mordida.'
    }
  ];
  
  return (
    <>
      <Navbar />
      <PageContainer>
        <HeroSection>
          <HeroTitle>Agende sua Consulta</HeroTitle>
          <HeroSubtitle>
            Cuide da sua saúde bucal com nossa equipe de profissionais qualificados.
            Preencha o formulário abaixo para solicitar um agendamento e entraremos em contato o mais breve possível.
          </HeroSubtitle>
        </HeroSection>
        
        <ServicesSection>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <div className="icon">
                  <i className={`fas fa-${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesSection>
        
        <FormSection>
          <SectionTitle>Solicitar Agendamento</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="nome">Nome Completo*</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="telefone">Telefone*</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="servico">Serviço Desejado*</label>
              <select
                id="servico"
                name="servico"
                value={formData.servico}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um serviço</option>
                <option value="Limpeza Dentária">Limpeza Dentária</option>
                <option value="Tratamento de Canal">Tratamento de Canal</option>
                <option value="Clareamento Dental">Clareamento Dental</option>
                <option value="Coroas e Pontes">Coroas e Pontes</option>
                <option value="Implantes Dentários">Implantes Dentários</option>
                <option value="Ortodontia">Ortodontia</option>
                <option value="Consulta Geral">Consulta Geral</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="dataPreferida">Data Preferida*</label>
              <input
                type="date"
                id="dataPreferida"
                name="dataPreferida"
                value={formData.dataPreferida}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="horaPreferida">Horário Preferido*</label>
              <select
                id="horaPreferida"
                name="horaPreferida"
                value={formData.horaPreferida}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um horário</option>
                <option value="Manhã">Manhã (9h - 12h)</option>
                <option value="Tarde">Tarde (14h - 18h)</option>
              </select>
            </FormGroup>
            
            <FullWidthFormGroup>
              <label htmlFor="mensagem">Mensagem Adicional</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleInputChange}
                placeholder="Informe detalhes adicionais ou preocupações específicas..."
              />
            </FullWidthFormGroup>
            
            <FullWidthFormGroup style={{ textAlign: 'center' }}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Solicitar Agendamento'}
              </Button>
            </FullWidthFormGroup>
          </Form>
        </FormSection>
      </PageContainer>
      <Footer />
    </>
  );
};

export default ClientesPublicPage;
