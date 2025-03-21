import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import ClienteService from '../../services/cliente.service';
import authHeader from '../../services/auth-header';
import axios from 'axios';

const ProfileContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
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
  border-radius: 4px;
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

const HistoryContainer = styled.div`
  margin-top: 2rem;
`;

const HistoryItem = styled.div`
  background-color: #f8f9fa;
  border-left: 3px solid #3498db;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const HistoryDate = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const HistoryContent = styled.div`
  color: #2c3e50;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const API_URL = 'http://localhost:8000/api';

function ClientePerfilPage({ clienteData }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [historico, setHistorico] = useState([]);
  
  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [morada, setMorada] = useState('');
  const [nif, setNif] = useState('');
  
  const currentUser = AuthService.getCurrentUser();
  
  useEffect(() => {
    // Primeiro tentamos usar os dados passados como prop
    if (clienteData) {
      console.log("Using clienteData from props:", clienteData);
      setCliente(clienteData);
      setFormData(clienteData);
      
      // Processar histórico se existir
      if (clienteData.historico) {
        try {
          const historicoArray = Array.isArray(clienteData.historico) 
            ? clienteData.historico 
            : (typeof clienteData.historico === 'string' 
               ? JSON.parse(clienteData.historico) 
               : []);
          setHistorico(historicoArray);
        } catch (e) {
          console.error("Erro ao processar histórico:", e);
          setHistorico([]);
        }
      }
    } else {
      // Se não houver dados via prop, buscamos da API
      fetchClienteData();
    }
  }, [clienteData]);
  
  const fetchClienteData = async () => {
    try {
      setLoading(true);
      console.log("Fetching client data from API...");
      
      const response = await ClienteService.getClienteProfile();
      
      if (response && response.data) {
        console.log("Client data received:", response.data);
        
        // Tentar localizar os dados do cliente na estrutura da resposta
        const clientData = response.data.cliente || response.data;
        console.log("Extracted client data:", clientData);
        
        setCliente(clientData);
        setFormData(clientData);
        
        // Processar histórico
        if (clientData.historico) {
          try {
            const historicoArray = Array.isArray(clientData.historico) 
              ? clientData.historico 
              : (typeof clientData.historico === 'string' 
                 ? JSON.parse(clientData.historico) 
                 : []);
            setHistorico(historicoArray);
          } catch (e) {
            console.error("Erro ao processar histórico:", e);
            setHistorico([]);
          }
        }
      } else {
        console.warn("No client data received, using current user data");
        setFormData({
          nome: currentUser?.nome || currentUser?.username || '',
          email: currentUser?.email || '',
          telefone: currentUser?.telefone || '',
          dataNascimento: '',
          morada: '',
          nif: ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
      toast.error('Erro ao carregar seus dados');
      
      // Fallback para os dados do usuário
      setFormData({
        nome: currentUser?.nome || currentUser?.username || '',
        email: currentUser?.email || '',
        telefone: currentUser?.telefone || '',
        dataNascimento: '',
        morada: '',
        nif: ''
      });
    } finally {
      setLoading(false);
    }
  };
  
  const setFormData = (data) => {
    console.log("Setting form data with:", data);
    setNome(data.nome || '');
    setEmail(data.email || '');
    setTelefone(data.telefone || '');
    
    // Formatar a data de nascimento para o formato esperado pelo input type="date"
    let formattedDate = '';
    if (data.dataNascimento) {
      try {
        // Tenta extrair apenas a parte da data se for uma string ISO
        formattedDate = data.dataNascimento.split('T')[0];
      } catch (e) {
        console.error("Erro ao formatar data:", e);
        formattedDate = '';
      }
    }
    setDataNascimento(formattedDate);
    
    setMorada(data.morada || '');
    setNif(data.nif || '');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const clienteData = {
        nome,
        email,
        telefone,
        dataNascimento,
        morada,
        nif
      };
      
      // Use ClienteService instead of direct axios call
      await ClienteService.updateClienteProfile(clienteData);
      
      toast.success('Perfil atualizado com sucesso!');
      setSaving(false);
      
      // Atualizar dados locais
      setCliente({...cliente, ...clienteData});
      
      // Adicionar entrada ao histórico
      const newHistoryEntry = {
        date: new Date().toISOString(),
        action: 'Atualização de perfil',
        details: 'Informações pessoais atualizadas'
      };
      
      const updatedHistorico = [newHistoryEntry, ...historico];
      setHistorico(updatedHistorico);
      
      // Atualizar histórico no servidor - consider moving this to a service method too
      try {
        await axios.post(
          `${API_URL}/clientes/historico`,
          { historico: JSON.stringify(updatedHistorico) },
          { headers: authHeader() }
        );
      } catch (historyError) {
        console.warn('Erro ao atualizar histórico:', historyError);
        // Don't show error to user since the profile was updated successfully
      }
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil');
      setSaving(false);
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              required
            />
          </FormGroup>
          
          <Button type="submit" disabled={saving}>
            {saving ? 'A guardar...' : 'Guardar Alterações'}
          </Button>
        </Form>
      </ProfileSection>
      
      <ProfileSection>
        <SectionTitle>Histórico de Atividades</SectionTitle>
        <HistoryContainer>
          {historico.length > 0 ? (
            historico.map((item, index) => (
              <HistoryItem key={index}>
                <HistoryDate>{formatDate(item.date)}</HistoryDate>
                <HistoryContent>
                  <strong>{item.action}</strong>: {item.details}
                </HistoryContent>
              </HistoryItem>
            ))
          ) : (
            <EmptyState>
              <p>Nenhuma atividade registrada ainda.</p>
            </EmptyState>
          )}
        </HistoryContainer>
      </ProfileSection>
    </ProfileContainer>
  );
}

export default ClientePerfilPage;
