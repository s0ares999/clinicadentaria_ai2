import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import api from '../../services/api.config';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #2980b9;
  }
  
  &:disabled {
    background: #95a5a6;
  }
`;

function MedicoPerfilPage() {
  const [perfilData, setPerfilData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    crm: '',
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const user = AuthService.getCurrentUser();
      const response = await api.get(`utilizadores/${user.id}`);
      console.log('Dados do perfil:', response.data);
      
      setPerfilData({
        nome: response.data.nome || '',
        email: response.data.email || '',
        telefone: response.data.telefone || '',
        especialidade: response.data.especialidade || '',
        crm: response.data.crm || '',
        username: response.data.username || ''
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      toast.error('Erro ao carregar dados do perfil');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfilData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const user = AuthService.getCurrentUser();
      await api.put(`utilizadores/${user.id}`, perfilData);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <ProfileSection>
        <Title>Meu Perfil</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome</Label>
            <Input
              type="text"
              name="nome"
              value={perfilData.nome}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={perfilData.email}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Telefone</Label>
            <Input
              type="tel"
              name="telefone"
              value={perfilData.telefone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>CRM</Label>
            <Input
              type="text"
              name="crm"
              value={perfilData.crm}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Especialidade</Label>
            <Input
              type="text"
              name="especialidade"
              value={perfilData.especialidade}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </ProfileSection>
    </Container>
  );
}

export default MedicoPerfilPage; 