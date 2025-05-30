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

const LoadingText = styled.div`
  color: #7f8c8d;
  font-style: italic;
  padding: 0.5rem;
`;

const InfoText = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const AvailabilityInfo = styled.div`
  background-color: #e8f4fd;
  border: 1px solid #bee5eb;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #0c5460;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: #0c5460;
  }
`;

function ClienteNovoAgendamentoPage() {
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [dadosDisponibilidade, setDadosDisponibilidade] = useState(null);
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

  // Carregar horários disponíveis quando a data mudar
  useEffect(() => {
    const carregarHorarios = async () => {
      if (!dataAgendamento) {
        setHorariosDisponiveis([]);
        setDadosDisponibilidade(null);
        return;
      }

      setLoadingHorarios(true);
      setHoraSelecionada(''); // Limpar hora selecionada

      try {
        const dados = await ConsultaService.getHorariosDisponiveis(dataAgendamento);
        setHorariosDisponiveis(dados.horariosDisponiveis);
        setDadosDisponibilidade(dados);
        
        if (dados.horariosDisponiveis.length === 0) {
          toast.info('Não há horários disponíveis para esta data');
        }
      } catch (error) {
        console.error('Erro ao carregar horários:', error);
        toast.error('Erro ao carregar horários disponíveis');
        setHorariosDisponiveis([]);
        setDadosDisponibilidade(null);
      } finally {
        setLoadingHorarios(false);
      }
    };

    carregarHorarios();
  }, [dataAgendamento]);

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
      
      // Recarregar horários disponíveis após agendar
      if (dataAgendamento) {
        try {
          const dados = await ConsultaService.getHorariosDisponiveis(dataAgendamento);
          setHorariosDisponiveis(dados.horariosDisponiveis);
          setDadosDisponibilidade(dados);
          setHoraSelecionada(''); // Limpar seleção
        } catch (error) {
          console.error('Erro ao recarregar horários:', error);
        }
      }
      
      // Navegar após um breve delay
      setTimeout(() => {
        navigate('/cliente-dashboard/agendamentos');
      }, 2000);
      
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
            <InfoText>
              Selecione uma data para ver os horários disponíveis
            </InfoText>
          </FormGroup>

          <FormGroup>
            <Label>Horário Disponível*</Label>
            {loadingHorarios ? (
              <LoadingText>Carregando horários...</LoadingText>
            ) : (
              <Select
                value={horaSelecionada}
                onChange={(e) => setHoraSelecionada(e.target.value)}
                required
                disabled={!dataAgendamento || horariosDisponiveis.length === 0}
              >
                <option value="">
                  {!dataAgendamento 
                    ? "Selecione uma data primeiro"
                    : horariosDisponiveis.length === 0 
                      ? "Nenhum horário disponível"
                      : "Selecione um horário"
                  }
                </option>
                {horariosDisponiveis.map(horario => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </Select>
            )}
            {dadosDisponibilidade && (
              <InfoText>
                {horariosDisponiveis.length} horário(s) disponível(is) de 8 possíveis
              </InfoText>
            )}
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

          {dadosDisponibilidade && dadosDisponibilidade.horariosOcupados.length > 0 && (
            <AvailabilityInfo style={{ gridColumn: '1 / -1' }}>
              <h4>Informações sobre Disponibilidade</h4>
              <p>
                Horários já ocupados: {dadosDisponibilidade.horariosOcupados.join(', ')}
              </p>
            </AvailabilityInfo>
          )}

          <Button 
            type="submit" 
            disabled={submitting || !dataAgendamento || !horaSelecionada}
          >
            {submitting ? 'Agendando...' : 'Solicitar Consulta'}
          </Button>
        </Form>
      </ScheduleContainer>
    </Container>
  );
}

export default ClienteNovoAgendamentoPage;