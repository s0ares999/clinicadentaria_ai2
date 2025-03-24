import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../services/auth.service';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const LoginCard = styled.div`
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

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const RegisterLink = styled.p`
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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("\n=== TENTATIVA DE LOGIN NA PÁGINA ===");
    console.log("Email:", email);
    console.log("Senha (length):", password?.length || 0);

    try {
      if (!email || !password) {
        throw new Error('Por favor, preencha todos os campos');
      }

      console.log("Iniciando processo de login com email:", email);
      
      const userData = await AuthService.login(email, password);
      console.log("\n✅ Login bem-sucedido:", {
        ...userData,
        accessToken: userData.accessToken ? '[PRESENTE]' : '[AUSENTE]'
      });

      // Determinar rota com base no tipo de usuário
      let redirectPath;
      switch (userData.tipo?.toLowerCase()) {
        case 'admin':
          redirectPath = '/admin/dashboard';
          break;
        case 'medico':
          redirectPath = '/medico/dashboard';
          break;
        default:
          redirectPath = '/cliente/dashboard';
      }

      navigate(redirectPath);
      
    } catch (error) {
      console.error("\n❌ Erro no login na página:");
      console.error("Tipo:", error.name);
      console.error("Mensagem:", error.message);
      console.error("Stack:", error.stack);
      
      let errorMessage;
      if (error.response) {
        const { status, data } = error.response;
        console.error("Status:", status);
        console.error("Dados do erro:", data);
        
        switch (status) {
          case 401:
            errorMessage = data.message || "Email ou senha incorretos";
            break;
          case 404:
            errorMessage = "Serviço indisponível";
            break;
          case 500:
            errorMessage = "Erro no servidor. Tente novamente mais tarde";
            break;
          default:
            errorMessage = data.message || "Erro ao realizar login";
        }
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor";
      } else {
        errorMessage = error.message || "Erro ao realizar login";
      }
      
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <Navbar />
        
        <MainContent>
          <LoginCard>
            <CardTitle>Login</CardTitle>
            
            {message && <ErrorMessage>{message}</ErrorMessage>}
            
            <Form onSubmit={handleLogin}>
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
                />
              </FormGroup>
              
              <Button type="submit" disabled={loading}>
                {loading ? 'A carregar...' : 'Entrar'}
              </Button>
            </Form>
            
            <RegisterLink>
              Não tem uma conta? <Link to="/register">Registe-se aqui</Link>
            </RegisterLink>
          </LoginCard>
        </MainContent>
        
        <Footer />
      </PageContainer>
    </>
  );
}

export default LoginPage;
