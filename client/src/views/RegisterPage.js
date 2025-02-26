import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../services/auth.service';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const RegisterCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:disabled {
    background-color: #9cb3c9;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #2980b9;
  }
`;

const AlertMessage = styled.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;

  &.success {
    background-color: #d4edda;
    color: #155724;
  }

  &.error {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;

  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #2980b9;
      text-decoration: underline;
    }
  }
`;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    setSuccessful(false);

    try {
      await AuthService.register(username, email, password);
      setSuccessful(true);
      setMessage('Registo efetuado com sucesso! Pode fazer login agora.');
      setLoading(false);
      
      // Redirecionar para a página de login após um breve atraso
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
      setSuccessful(false);
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      
      <MainContent>
        <RegisterCard>
          <CardTitle>Registar</CardTitle>
          
          {message && (
            <AlertMessage className={successful ? 'success' : 'error'}>
              {message}
            </AlertMessage>
          )}
          
          <Form onSubmit={handleRegister}>
            <FormGroup>
              <Label htmlFor="username">Nome de Utilizador</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'A processar...' : 'Registar'}
            </Button>
          </Form>
          
          <LoginLink>
            Já tem uma conta? <Link to="/login">Faça login aqui</Link>
          </LoginLink>
        </RegisterCard>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
}

export default RegisterPage;
