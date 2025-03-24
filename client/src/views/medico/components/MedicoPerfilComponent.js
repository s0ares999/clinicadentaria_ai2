import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import MedicoService from '../../../services/medico.service';
import AuthService from '../../../services/auth.service';

const ProfileSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #dcdde1;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &:disabled {
    background-color: #f5f6fa;
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9;
  }
`;

function MedicoPerfilComponent() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    crm: '',
    horarioAtendimento: '',
    biografia: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMedicoData();
  }, []);

  const loadMedicoData = async () => {
    try {
      setLoading(true);
      console.log("Iniciando carregamento do perfil do médico...");
      const user = AuthService.getCurrentUser();
      console.log("Usuário atual:", user);
      
      // Verificar se o token está presente
      if (!user || !user.accessToken) {
        console.error("Token não encontrado!");
        setError('Token de autenticação ausente');
        return;
      }
      
      const response = await MedicoService.getMedicoPerfil();
      console.log('Dados brutos recebidos:', response);
      
      // A resposta vem diretamente do controller, não precisa do .data.data
      const userData = response.data;
      
      if (userData) {
        setFormData({
          nome: userData.nome || '',
          email: userData.email || '',
          telefone: userData.telefone || '',
          especialidade: userData.medico?.especialidade?.nome || '',
          crm: userData.medico?.crm || '',
          horarioAtendimento: userData.medico?.horarioAtendimento || '',
          biografia: userData.medico?.biografia || ''
        });
      } else {
        setError('Dados do médico não encontrados');
        toast.error('Dados do médico não encontrados');
      }
    } catch (error) {
      // Logar detalhes do erro
      console.error('Erro detalhado:', error.response || error);
      setError('Erro ao carregar dados do perfil');
      toast.error('Erro ao carregar dados do perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MedicoService.updateMedicoPerfil(formData);
      if (response.success) {
        toast.success('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      toast.error('Erro ao atualizar perfil');
    }
  };

  if (loading) {
    return <div>Carregando dados do perfil...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Informações Pessoais</h2>
      
      <ProfileSection>
        <ProfileHeader>
          <ProfileInfo>
            <h3>{formData.nome}</h3>
            <p>{formData.especialidade}</p>
          </ProfileInfo>
        </ProfileHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome Completo</Label>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              disabled
            />
            <small>O email não pode ser alterado</small>
          </FormGroup>

          <FormGroup>
            <Label>Telefone</Label>
            <Input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>CRM</Label>
            <Input
              type="text"
              name="crm"
              value={formData.crm}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Especialidade</Label>
            <Input
              type="text"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Horário de Atendimento</Label>
            <Input
              type="text"
              name="horarioAtendimento"
              value={formData.horarioAtendimento}
              onChange={handleChange}
            />
          </FormGroup>

          <SaveButton type="submit">
            Guardar Alterações
          </SaveButton>
        </Form>
      </ProfileSection>
    </div>
  );
}

export default MedicoPerfilComponent; 