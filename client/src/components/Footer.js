import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: #ffffff;
  padding: 3rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #3498db;
  }

  p {
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #3498db;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #34495e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3498db;
    }

    i {
      font-size: 1.2rem;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #34495e;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Clínica Dentária Viseense</h3>
          <p>
            Oferecemos um atendimento personalizado e de qualidade, utilizando 
            tecnologia de ponta para proporcionar o melhor tratamento dentário.
          </p>
          <SocialIcons>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <h3>Serviços</h3>
          <ul>
            <li><a href="#">Limpeza Dentária</a></li>
            <li><a href="#">Restaurações</a></li>
            <li><a href="#">Endodontia</a></li>
            <li><a href="#">Implantes</a></li>
            <li><a href="#">Ortodontia</a></li>
            <li><a href="#">Clareamento</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/sobre">Quem Somos</a></li>
            <li><a href="/#servicos">Serviços</a></li>
            <li><a href="/contactos">Contactos</a></li>
            <li><a href="/creditos">Créditos</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos e Condições</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contactos</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> Rua Direita, 12 - Viseu
          </p>
          <p>
            <i className="fas fa-phone"></i> +351 212 345 678
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@clinicadentaria.pt
          </p>
          <p>
            <i className="fas fa-clock"></i> Seg-Sex: 9h-19h | Sáb: 9h-13h
          </p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} Clínica Dentária Viseense. Todos os direitos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
