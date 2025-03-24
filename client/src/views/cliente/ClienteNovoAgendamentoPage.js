import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import ConsultaService from '../../services/consulta.service';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ScheduleContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
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
  transition: all 0.3s;
  grid-column: 1 / -1;
  margin-top: 1rem;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

function ClienteNovoAgendamentoPage() {
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (!user || !user.accessToken) {
      console.error("Usuário não autenticado");
      toast.error('Você precisa estar logado para agendar consultas');
      return;
    }
    
    console.log("Usuário autenticado na montagem do componente:", {
      id: user.id,
      email: user.email,
      token: user.accessToken ? "presente" : "ausente"
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dataAgendamento || !horaSelecionada) {
      toast.error('Por favor, selecione data e hora para a consulta');
      return;
    }
    
    const user = AuthService.getCurrentUser();
    console.log("Dados do usuário antes da submissão:", user);
    
    if (!user || !user.accessToken) {
      console.error("Usuário não autenticado ou token não encontrado");
      toast.error("Você precisa estar logado para agendar uma consulta");
      navigate('/login');
      return;
    }
    
    try {
      setSubmitting(true);
      const dataHora = `${dataAgendamento}T${horaSelecionada}:00`;
      
      const consultaData = {
        data_hora: dataHora,
        observacoes: observacoes || ''
      };
      
      console.log("Enviando dados:", consultaData);
      console.log("Token usado:", user.accessToken.substring(0, 20) + "...");
      
      const response = await ConsultaService.createConsulta(consultaData);
      toast.success('Consulta agendada com sucesso!');
      navigate('/cliente-dashboard/agendamentos');
    } catch (error) {
      console.error('Erro completo:', error);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados do erro:', error.response.data);
        
        // Tratamento específico para erro 401
        if (error.response.status === 401) {
          toast.error('Sua sessão expirou. Por favor, faça login novamente.');
          AuthService.logout(); // Limpa dados da sessão
          setTimeout(() => navigate('/login'), 2000); // Redireciona após 2 segundos
          return;
        }
      }
      
      toast.error(error.response?.data?.message || 'Erro ao agendar consulta');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <ScheduleContainer>
        <SectionTitle>Agendar Nova Consulta</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Data*</Label>
            <Input
              type="date"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Horário Preferido*</Label>
            <Select
              value={horaSelecionada}
              onChange={(e) => setHoraSelecionada(e.target.value)}
              required
            >
              <option value="">Selecione um horário</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </Select>
          </FormGroup>

          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>Observações</Label>
            <Input
              as="textarea"
              rows="4"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Adicione observações importantes sobre a consulta..."
            />
          </FormGroup>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Agendando...' : 'Solicitar Consulta'}
          </Button>
        </Form>
      </ScheduleContainer>
    </Container>
  );
}

export default ClienteNovoAgendamentoPage;
