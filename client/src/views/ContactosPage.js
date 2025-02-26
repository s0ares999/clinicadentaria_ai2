import React, { useState } from 'react';
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

const ContactSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .icon {
    margin-right: 1rem;
    color: #3498db;
    font-size: 1.5rem;
    min-width: 1.5rem;
  }

  .text {
    color: #7f8c8d;
    line-height: 1.6;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }

  input, textarea, select {
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #2980b9;
  }

  .success-message {
    padding: 1rem;
    background-color: #d4edda;
    color: #155724;
    border-radius: 4px;
    margin-top: 1rem;
  }

  .error-message {
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border-radius: 4px;
    margin-top: 1rem;
  }
`;

const MapSection = styled.section`
  height: 450px;
  position: relative;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

function ContactosPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio de formulário
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
    }, 1000);
  };

  return (
    <PageContainer>
      <Navbar />
      
      <MainContent>
        <HeroSection>
          <HeroTitle>Entre em Contacto</HeroTitle>
          <HeroSubtitle>
            Estamos prontos para atendê-lo e responder a todas as suas dúvidas.
            Entre em contacto connosco pelos canais abaixo ou visite a nossa clínica.
          </HeroSubtitle>
        </HeroSection>
        
        <ContactSection>
          <ContactInfo>
            <h2>Informações de Contacto</h2>
            
            <div className="info-item">
              <div className="icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="text">
                <h3>Localização</h3>
                <p>Rua da Clínica, 123<br />1000-000 Lisboa, Portugal</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="text">
                <h3>Telefone</h3>
                <p>+351 210 123 456<br />+351 919 987 654</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>info@clinicadentaria.pt<br />marcacoes@clinicadentaria.pt</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="text">
                <h3>Horário de Funcionamento</h3>
                <p>Segunda a Sexta: 9h às 19h<br />Sábado: 9h às 13h<br />Domingo: Fechado</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </ContactInfo>
          
          <ContactForm>
            <h2>Envie-nos uma Mensagem</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  value={formData.nome}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input 
                  type="tel" 
                  id="telefone" 
                  name="telefone" 
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="assunto">Assunto</label>
                <select 
                  id="assunto" 
                  name="assunto" 
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Marcar Consulta">Marcar Consulta</option>
                  <option value="Orçamento">Orçamento</option>
                  <option value="Dúvida">Dúvida</option>
                  <option value="Sugestão">Sugestão</option>
                  <option value="Reclamação">Reclamação</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea 
                  id="mensagem" 
                  name="mensagem" 
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit">Enviar Mensagem</button>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  Mensagem enviada com sucesso! Entraremos em contacto brevemente.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
                </div>
              )}
            </form>
          </ContactForm>
        </ContactSection>
        
        <MapSection>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49792.39730438066!2d-9.2252449!3d38.7436267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19331a61e4f33b%3A0x400ebbde49036d0!2sLisboa!5e0!3m2!1spt-PT!2spt!4v1682345678901!5m2!1spt-PT!2spt" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Clínica Dentária"
          ></iframe>
        </MapSection>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
}

export default ContactosPage;
