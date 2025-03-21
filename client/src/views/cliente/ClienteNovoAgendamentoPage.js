import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import authHeader from '../../services/auth-header';
import { useNavigate } from 'react-router-dom';
import ConsultaService from '../../services/consulta.service';

const API_URL = "http://localhost:8000/api";

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

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TimeOption = styled.div`
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#3498db' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? '#2980b9' : '#e0e0e0'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function ClienteNovoAgendamentoPage() {
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se o usuário está autenticado
    const user = AuthService.getCurrentUser();
    
    if (!user || !user.accessToken) {
      navigate('/login');
      return;
    }
    
    // Carregar médicos disponíveis
    carregarMedicos();
  }, [navigate]);

  useEffect(() => {
    if (dataAgendamento && medicoSelecionado) {
      carregarDisponibilidades(medicoSelecionado, dataAgendamento);
    }
  }, [dataAgendamento, medicoSelecionado]);

  const carregarMedicos = async () => {
    try {
      const response = await axios.get(`${API_URL}/utilizadores/medicos`, {
        headers: authHeader()
      });
      setMedicos(response.data);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      toast.error('Não foi possível carregar a lista de médicos');
    }
  };

  const carregarDisponibilidades = async (medicoId, data) => {
    try {
      const response = await axios.get(
        `${API_URL}/disponibilidades/medico/${medicoId}/data/${data}`,
        { headers: authHeader() }
      );
      
      setDisponibilidades(response.data);
    } catch (error) {
      console.error('Erro ao carregar disponibilidades:', error);
      toast.error('Não foi possível carregar os horários disponíveis');
      setDisponibilidades([]);
    }
  };

  const handleSelectHora = (hora) => {
    setHoraSelecionada(hora === horaSelecionada ? '' : hora);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dataAgendamento || !horaSelecionada || !medicoSelecionado) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Get current user
      const user = AuthService.getCurrentUser();
      
      // Format date and time for the API
      const dataHora = `${dataAgendamento}T${horaSelecionada}:00`;
      
      const consultaData = {
        cliente_id: user.id,
        medico_id: medicoSelecionado,
        data_hora: dataHora,
        observacoes: observacoes
      };
      
      // Use the ConsultaService to create the appointment
      const response = await ConsultaService.createConsulta(consultaData);
      
      toast.success('Consulta agendada com sucesso!');
      navigate('/cliente-dashboard/agendamentos');
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      toast.error(error.response?.data?.message || 'Erro ao agendar consulta');
    } finally {
      setSubmitting(false);
    }
  };

  // Função para formatar a disponibilidade em intervalos de 30 minutos
  const formatarHorariosDisponiveis = () => {
    if (!disponibilidades || disponibilidades.length === 0) return [];
    
    const horarios = [];
    
    disponibilidades.forEach(disp => {
      const [horaInicio, minInicio] = disp.hora_inicio.split(':').map(Number);
      const [horaFim, minFim] = disp.hora_fim.split(':').map(Number);
      
      let horaAtual = horaInicio;
      let minAtual = minInicio;
      
      // Criar intervalos de 30 minutos
      while (
        horaAtual < horaFim || 
        (horaAtual === horaFim && minAtual < minFim)
      ) {
        const horaFormatada = `${horaAtual.toString().padStart(2, '0')}:${minAtual.toString().padStart(2, '0')}`;
        horarios.push(horaFormatada);
        
        // Incrementar 30 minutos
        minAtual += 30;
        if (minAtual >= 60) {
          horaAtual += 1;
          minAtual = 0;
        }
      }
    });
    
    return horarios;
  };

  const horariosDisponiveis = formatarHorariosDisponiveis();

  return (
    <Container>
      <ScheduleContainer>
        <SectionTitle>Agendar Nova Consulta</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="medico">Médico</Label>
            <Select
              id="medico"
              value={medicoSelecionado}
              onChange={(e) => setMedicoSelecionado(e.target.value)}
              required
            >
              <option value="">Selecione um médico</option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  Dr(a). {medico.nome} - {medico.medico?.especialidade?.nome || "Clínica Geral"}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="data">Data</Label>
            <Input
              type="date"
              id="data"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>
          
          {dataAgendamento && medicoSelecionado && (
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <Label>Horários Disponíveis</Label>
              {horariosDisponiveis.length > 0 ? (
                <TimeGrid>
                  {horariosDisponiveis.map((hora) => (
                    <TimeOption
                      key={hora}
                      selected={hora === horaSelecionada}
                      onClick={() => handleSelectHora(hora)}
                    >
                      {hora}
                    </TimeOption>
                  ))}
                </TimeGrid>
              ) : (
                <ErrorMessage>
                  Não há horários disponíveis para esta data. Por favor, selecione outra data.
                </ErrorMessage>
              )}
            </FormGroup>
          )}
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Input
              as="textarea"
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              style={{ height: '100px', resize: 'vertical' }}
            />
          </FormGroup>
          
          <Button type="submit" disabled={submitting || !horaSelecionada}>
            {submitting ? 'Agendando...' : 'Agendar Consulta'}
          </Button>
        </Form>
      </ScheduleContainer>
    </Container>
  );
}

export default ClienteNovoAgendamentoPage;
