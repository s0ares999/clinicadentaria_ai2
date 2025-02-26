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

const RoleSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const RoleOption = styled.div`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e0e0e0'};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.selected ? '#f0f7fc' : '#fff'};

  &:hover {
    border-color: #3498db;
  }

  .role-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${props => props.selected ? '#3498db' : '#7f8c8d'};
  }

  .role-title {
    font-weight: 600;
    color: #2c3e50;
  }

  .role-desc {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin-top: 0.5rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  
  // Campos adicionais para cliente
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [morada, setMorada] = useState('');
  const [nif, setNif] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    setSuccessful(false);

    try {
      // Dados adicionais para cliente
      const clienteData = role === 'cliente' ? {
        nome,
        telefone,
        dataNascimento,
        morada,
        nif
      } : null;
      
      await AuthService.register(username, email, password, role, clienteData);
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
            <RoleSelector>
              <RoleOption 
                selected={role === 'cliente'} 
                onClick={() => setRole('cliente')}
              >
                <div className="role-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="role-title">Cliente</div>
                <div className="role-desc">Agende consultas e acompanhe tratamentos</div>
              </RoleOption>
              
              <RoleOption 
                selected={role === 'admin'} 
                onClick={() => setRole('admin')}
              >
                <div className="role-icon">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="role-title">Administrador</div>
                <div className="role-desc">Gerencie a clínica e pacientes</div>
              </RoleOption>
            </RoleSelector>
            
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
            
            {role === 'cliente' && (
              <>
                <FormGroup>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    type="text"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="morada">Morada</Label>
                  <Input
                    type="text"
                    id="morada"
                    name="morada"
                    value={morada}
                    onChange={(e) => setMorada(e.target.value)}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="nif">NIF</Label>
                  <Input
                    type="text"
                    id="nif"
                    name="nif"
                    value={nif}
                    onChange={(e) => setNif(e.target.value)}
                    required
                  />
                </FormGroup>
              </>
            )}
            
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
