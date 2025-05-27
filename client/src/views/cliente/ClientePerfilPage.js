import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import ClienteService from '../../services/cliente.service';

const ProfileContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  b order-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const API_URL = 'http://localhost:8000/api';

const ClientePerfilPage = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [historico, setHistorico] = useState([]);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    morada: '',
    nif: ''
  });

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // liga o loading
      try {
        const response = await ClienteService.getClienteProfile();
        if (response.success && response.data) {
          setFormData({
            nome: response.data.nome || '',
            email: response.data.email || '',
            telefone: response.data.telefone || '',
            dataNascimento: response.data.dataNascimento || '',
            morada: response.data.morada || '',
            nif: response.data.nif || ''
          });
        }
      } catch (error) {
        toast.error("Erro ao carregar dados do perfil");
      } finally {
        setLoading(false); // desliga o loading
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); // liga saving
    try {
      const response = await ClienteService.updateClienteProfile(formData);
      if (response.success) {
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setSaving(false); // desliga saving
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Carregando dados do perfil...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileSection>
        <SectionTitle>Informações Pessoais</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled
            />
            <small style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
              O email não pode ser alterado
            </small>
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                type="date"
                id="dataNascimento"
                value={formData.dataNascimento}
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                required
                disabled
              />
              <small style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
                A data de nascimento não pode ser alterada
              </small>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="morada">Morada</Label>
            <Input
              type="text"
              id="morada"
              value={formData.morada}
              onChange={(e) => setFormData({ ...formData, morada: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="nif">NIF</Label>
            <Input
              type="text"
              id="nif"
              value={formData.nif}
              onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
              required
            />
          </FormGroup>

          <Button type="submit" disabled={saving}>
            {saving ? 'A guardar...' : 'Guardar Alterações'}
          </Button>
        </Form>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default ClientePerfilPage;
