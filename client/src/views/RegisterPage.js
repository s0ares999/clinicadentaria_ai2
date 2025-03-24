import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../services/auth.service';
import axios from 'axios';
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
  max-width: 600px;
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

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  > div {
    flex: 1;
  }
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

const Select = styled.select`
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
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoleButton = styled.button`
  flex: 1;
  padding: 1rem;
  background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#e0e0e0'};
  }
`;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [role, setRole] = useState('cliente');
  
  // Campos específicos para cliente
  const [dataNascimento, setDataNascimento] = useState('');
  const [nif, setNif] = useState('');
  const [morada, setMorada] = useState('');
  
  // Campos específicos para médico
  const [especialidadeId, setEspecialidadeId] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  
  // Campos específicos para admin
  const [nivelAcesso, setNivelAcesso] = useState('geral');
  
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Carregar especialidades se o usuário selecionar o papel de médico
    if (role === 'medico') {
      const fetchEspecialidades = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/especialidades');
          setEspecialidades(response.data);
        } catch (error) {
          console.error('Erro ao carregar especialidades:', error);
          setEspecialidades([
            { id: 1, nome: 'Ortodontia' },
            { id: 2, nome: 'Endodontia' },
            { id: 3, nome: 'Periodontia' },
            { id: 4, nome: 'Implantodontia' },
            { id: 5, nome: 'Odontopediatria' }
          ]);
        }
      };
      
      fetchEspecialidades();
    }
  }, [role]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      // Montagem dos dados específicos por tipo de usuário
      let dadosEspecificos = {};
      
      if (role === 'cliente') {
        dadosEspecificos = {
          data_nascimento: dataNascimento,
          nif: nif,
          morada: morada
        };
      } else if (role === 'medico') {
        dadosEspecificos = {
          especialidade_id: especialidadeId,
          crm: crm
        };
        
        // Verificar se os campos obrigatórios estão preenchidos
        if (!especialidadeId || !crm) {
          setError('CRM e especialidade são obrigatórios para médicos');
          setLoading(false);
          return;
        }
      } else if (role === 'admin') {
        dadosEspecificos = {
          nivel_acesso: nivelAcesso
        };
      }

      // Envio dos dados para o serviço de autenticação
      const response = await AuthService.register(
        email, 
        password, 
        username, 
        telefone, 
        role, 
        dadosEspecificos
      );

      if (response.data) {
        setSuccessful(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao registrar-se';
      setError(message);
      console.error("Erro no registro:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <Navbar />
      
      <MainContent>
        <RegisterCard>
          <CardTitle>Criar Conta</CardTitle>
          
          {error && (
            <AlertMessage className="error">
              {error}
            </AlertMessage>
          )}
          
          <Form onSubmit={handleSubmit}>
            <RoleSelector>
              <RoleButton
                type="button"
                active={role === 'cliente'}
                onClick={() => setRole('cliente')}
              >
                Cliente
              </RoleButton>
              <RoleButton
                type="button"
                active={role === 'medico'}
                onClick={() => setRole('medico')}
              >
                Médico
              </RoleButton>
              <RoleButton
                type="button"
                active={role === 'admin'}
                onClick={() => setRole('admin')}
              >
                Administrador
              </RoleButton>
            </RoleSelector>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="username">Nome de Utilizador</Label>
                <Input
                  type="text"
                  id="username"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </FormGroup>
            
            {/* Campos específicos para cliente */}
            {role === 'cliente' && (
              <>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      type="date"
                      id="dataNascimento"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="nif">NIF</Label>
                    <Input
                      type="text"
                      id="nif"
                      value={nif}
                      onChange={(e) => setNif(e.target.value)}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="morada">Morada</Label>
                  <Input
                    type="text"
                    id="morada"
                    value={morada}
                    onChange={(e) => setMorada(e.target.value)}
                    required
                  />
                </FormGroup>
              </>
            )}
            
            {/* Campos específicos para médico */}
            {role === 'medico' && (
              <>
                <FormGroup>
                  <Label htmlFor="especialidade">Especialidade</Label>
                  <Select
                    id="especialidade"
                    value={especialidadeId}
                    onChange={(e) => setEspecialidadeId(e.target.value)}
                    required
                  >
                    <option value="">Selecione uma especialidade</option>
                    {especialidades.map(esp => (
                      <option key={esp.id} value={esp.id}>
                        {esp.nome}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="crm">CRM (Cédula Profissional)</Label>
                  <Input
                    type="text"
                    id="crm"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    required
                  />
                </FormGroup>
              </>
            )}
            
            {/* Campos específicos para admin */}
            {role === 'admin' && (
              <FormGroup>
                <Label htmlFor="nivelAcesso">Nível de Acesso</Label>
                <Select
                  id="nivelAcesso"
                  value={nivelAcesso}
                  onChange={(e) => setNivelAcesso(e.target.value)}
                  required
                >
                  <option value="geral">Geral</option>
                  <option value="total">Total</option>
                  <option value="restrito">Restrito</option>
                </Select>
              </FormGroup>
            )}
            
            <Button type="submit" disabled={loading}>
              {loading ? 'A processar...' : 'Registar'}
            </Button>
            
            <LoginLink>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </LoginLink>
          </Form>
        </RegisterCard>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
}

export default RegisterPage;
