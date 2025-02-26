import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import authHeader from '../../services/auth-header';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AppointmentsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
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

const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .appointment-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .date-time {
      min-width: 100px;
      text-align: center;
      
      .date {
        font-weight: 600;
        color: #3498db;
      }
      
      .time {
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #7f8c8d;
      }
    }
    
    .details {
      .service {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }
      
      .notes {
        font-size: 0.875rem;
        color: #7f8c8d;
      }
    }
  }
  
  .status-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      
      &.confirmado {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      
      &.pendente {
        background-color: #fff8e1;
        color: #f57f17;
      }
      
      &.cancelado {
        background-color: #ffebee;
        color: #c62828;
      }
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  
  i {
    font-size: 3rem;
    color: #bdc3c7;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  p {
    color: #7f8c8d;
    margin-bottom: 1.5rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  background-color: ${props => props.danger ? '#e74c3c' : '#3498db'};
  color: white;
  
  &:hover {
    background-color: ${props => props.danger ? '#c0392b' : '#2980b9'};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

function ClienteAgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    dataHora: '',
    servico: '',
    observacoes: ''
  });
  const [servicos, setServicos] = useState([
    'Consulta Geral',
    'Limpeza Dentária',
    'Tratamento de Canal',
    'Extração',
    'Implante Dentário',
    'Ortodontia',
    'Clareamento Dental',
    'Prótese Dentária'
  ]);
  const [horarios, setHorarios] = useState([]);
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  useEffect(() => {
    if (dataAgendamento) {
      gerarHorariosDisponiveis(dataAgendamento);
    }
  }, [dataAgendamento]);

  const fetchAgendamentos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/agendamentos/cliente`, { 
        headers: authHeader()
      });
      console.log('Agendamentos recebidos:', response.data);
      setAgendamentos(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      setAgendamentos([]);
      setLoading(false);
    }
  };

  const gerarHorariosDisponiveis = async (data) => {
    try {
      // Em um cenário real, buscaríamos os horários disponíveis da API
      // Por enquanto, vamos gerar horários fictícios
      const horariosDisponiveis = [];
      const dataObj = new Date(data);
      
      // Verificar se é fim de semana
      const diaSemana = dataObj.getDay();
      if (diaSemana === 0 || diaSemana === 6) {
        // Sábado ou domingo
        for (let hora = 9; hora <= 12; hora++) {
          horariosDisponiveis.push(`${hora}:00`);
          if (hora < 12) horariosDisponiveis.push(`${hora}:30`);
        }
      } else {
        // Dia de semana
        for (let hora = 9; hora <= 18; hora++) {
          if (hora !== 13) { // Excluir horário de almoço
            horariosDisponiveis.push(`${hora}:00`);
            if (hora < 18) horariosDisponiveis.push(`${hora}:30`);
          }
        }
      }
      
      // Em um cenário real, verificaríamos quais horários já estão ocupados
      // e os removeríamos da lista
      setHorarios(horariosDisponiveis);
    } catch (error) {
      console.error('Erro ao gerar horários disponíveis:', error);
      toast.error('Erro ao carregar horários disponíveis');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'data') {
      setDataAgendamento(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dataAgendamento || !formData.hora || !formData.servico) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Combinar data e hora
      const dataHora = new Date(`${dataAgendamento}T${formData.hora}`);
      
      const agendamentoData = {
        dataHora: dataHora.toISOString(),
        servico: formData.servico,
        observacoes: formData.observacoes,
        estado: 'Pendente'
      };
      
      await axios.post(
        `${API_URL}/agendamentos`, 
        agendamentoData,
        { headers: authHeader() }
      );
      
      toast.success('Consulta agendada com sucesso!');
      
      // Limpar formulário
      setFormData({
        dataHora: '',
        servico: '',
        observacoes: ''
      });
      setDataAgendamento('');
      
      // Atualizar lista de agendamentos
      fetchAgendamentos();
      setSubmitting(false);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      toast.error('Erro ao agendar consulta. Por favor, tente novamente.');
      setSubmitting(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        await axios.put(
          `${API_URL}/agendamentos/${id}/cancelar`, 
          {}, 
          { headers: authHeader() }
        );
        toast.success('Agendamento cancelado com sucesso');
        fetchAgendamentos();
      } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        toast.error('Erro ao cancelar agendamento');
      }
    }
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    
    console.log('Status recebido:', status);
    
    switch (status.toLowerCase()) {
      case 'confirmado':
        return 'confirmado';
      case 'pendente':
        return 'pendente';
      case 'cancelado':
        return 'cancelado';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  // Calcular a data mínima (hoje)
  const today = new Date().toISOString().split('T')[0];
  
  // Calcular a data máxima (3 meses a partir de hoje)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <Container>
      <ScheduleContainer>
        <SectionTitle>Agendar Nova Consulta</SectionTitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="data">Data *</Label>
            <Input 
              type="date" 
              id="data" 
              name="data"
              value={dataAgendamento}
              onChange={handleInputChange}
              min={today}
              max={maxDateString}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="hora">Horário *</Label>
            <Select 
              id="hora" 
              name="hora"
              value={formData.hora || ''}
              onChange={handleInputChange}
              required
              disabled={!dataAgendamento}
            >
              <option value="">Selecione um horário</option>
              {horarios.map(horario => (
                <option key={horario} value={horario}>
                  {horario}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="servico">Serviço *</Label>
            <Select 
              id="servico" 
              name="servico"
              value={formData.servico}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um serviço</option>
              {servicos.map(servico => (
                <option key={servico} value={servico}>
                  {servico}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="observacoes">Observações</Label>
            <TextArea 
              id="observacoes" 
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              placeholder="Descreva qualquer informação adicional relevante para a consulta"
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Agendando...' : 'Agendar Consulta'}
            </Button>
          </ButtonGroup>
        </Form>
      </ScheduleContainer>
      
      <AppointmentsContainer>
        <SectionTitle>Meus Agendamentos</SectionTitle>
        
        <AppointmentList>
          {loading ? (
            <EmptyState>
              <p>Carregando agendamentos...</p>
            </EmptyState>
          ) : agendamentos.length > 0 ? (
            agendamentos.map(agendamento => (
              <AppointmentItem key={agendamento.id}>
                <div className="appointment-info">
                  <div className="date-time">
                    <div className="date">{formatDate(agendamento.dataHora)}</div>
                    <div className="time">{formatTime(agendamento.dataHora)}</div>
                  </div>
                  <div className="details">
                    <div className="service">{agendamento.servico || 'Consulta Geral'}</div>
                    <div className="notes">{agendamento.observacoes || 'Sem observações'}</div>
                  </div>
                </div>
                <div className="status-actions">
                  <span className={`status ${getStatusClass(agendamento.estado)}`}>
                    {agendamento.estado || 'Pendente'}
                  </span>
                  {(!agendamento.estado || agendamento.estado.toLowerCase() === 'pendente') && (
                    <Button 
                      danger
                      onClick={() => handleCancelAppointment(agendamento.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </AppointmentItem>
            ))
          ) : (
            <EmptyState>
              <i className="far fa-calendar-alt"></i>
              <h3>Nenhuma consulta agendada</h3>
              <p>Você ainda não tem consultas agendadas.</p>
            </EmptyState>
          )}
        </AppointmentList>
      </AppointmentsContainer>
    </Container>
  );
}

export default ClienteAgendamentosPage;
