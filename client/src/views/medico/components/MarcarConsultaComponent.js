import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AuthService from '../../../services/auth.service';
import ConsultaService from '../../../services/consulta.service';

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
  background-color: #27ae60;
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
    background-color: #229954;
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
  background-color: #e8f5e8;
  border: 1px solid #c8e6c9;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #2e7d32;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: #2e7d32;
  }
`;

const UserInfoBox = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #495057;
    font-size: 1rem;
  }
  
  p {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
  }
`;

function MarcarConsultaComponent() {
  const [clienteEmail, setClienteEmail] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [dadosDisponibilidade, setDadosDisponibilidade] = useState(null);
  const [medicoLogado, setMedicoLogado] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (!user || !user.accessToken) {
      console.error("Médico não autenticado");
      toast.error('Você precisa estar logado para marcar consultas');
      return;
    }
    
    if (user.tipo !== 'medico') {
      toast.error('Acesso negado. Apenas médicos podem marcar consultas.');
      return;
    }
    
    setMedicoLogado(user);
    console.log("Médico autenticado:", {
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    });
  }, []);

  // Carregar horários disponíveis quando a data mudar
  useEffect(() => {
    const carregarHorarios = async () => {
      if (!dataAgendamento || !medicoLogado) {
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
  }, [dataAgendamento, medicoLogado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!clienteEmail || !dataAgendamento || !horaSelecionada) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!clienteEmail.includes('@')) {
      toast.error('Por favor, insira um email válido para o cliente');
      return;
    }
    
    if (!medicoLogado || !medicoLogado.accessToken) {
      console.error("Médico não autenticado ou token não encontrado");
      toast.error("Você precisa estar logado para marcar uma consulta");
      return;
    }
    
    try {
      setSubmitting(true);
      const dataHora = `${dataAgendamento}T${horaSelecionada}:00`;
      
      const consultaData = {
        data_hora: dataHora,
        observacoes: observacoes || '',
        cliente_email: clienteEmail,
        medico_id: medicoLogado.id,
        status_id: 2 // Status "Confirmada" já que o médico está marcando diretamente
      };
      
      console.log("Enviando dados da consulta:", consultaData);
      console.log("Token do médico usado:", medicoLogado.accessToken.substring(0, 20) + "...");
      
      // Use o método específico para médicos se disponível, senão use o método padrão
      const response = ConsultaService.createConsultaByMedico 
        ? await ConsultaService.createConsultaByMedico(consultaData)
        : await ConsultaService.createConsulta(consultaData);
      toast.success('Consulta marcada com sucesso para o cliente!');
      
      // Limpar formulário
      setClienteEmail('');
      setDataAgendamento('');
      setHoraSelecionada('');
      setObservacoes('');
      
      // Recarregar horários disponíveis
      if (dataAgendamento) {
        try {
          const dados = await ConsultaService.getHorariosDisponiveis(dataAgendamento);
          setHorariosDisponiveis(dados.horariosDisponiveis);
          setDadosDisponibilidade(dados);
        } catch (error) {
          console.error('Erro ao recarregar horários:', error);
        }
      }
      
    } catch (error) {
      console.error('Erro completo:', error);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados do erro:', error.response.data);
        
        // Tratamento específico para erro 401
        if (error.response.status === 401) {
          toast.error('Sua sessão expirou. Por favor, faça login novamente.');
          AuthService.logout();
          return;
        }

        // Tratamento para cliente não encontrado
        if (error.response.status === 404 && error.response.data?.message?.includes('Cliente')) {
          toast.error('Cliente não encontrado. Verifique o email informado.');
          return;
        }
      }
      
      toast.error(error.response?.data?.message || 'Erro ao marcar consulta');
    } finally {
      setSubmitting(false);
    }
  };

  if (!medicoLogado) {
    return (
      <Container>
        <ScheduleContainer>
          <SectionTitle>Carregando...</SectionTitle>
          <LoadingText>Verificando autenticação...</LoadingText>
        </ScheduleContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ScheduleContainer>
        <SectionTitle>Marcar Nova Consulta</SectionTitle>
        
        <UserInfoBox>
          <h4>Médico Responsável</h4>
          <p><strong>Dr(a). {medicoLogado.nome}</strong> - {medicoLogado.email}</p>
        </UserInfoBox>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email do Cliente*</Label>
            <Input
              type="email"
              value={clienteEmail}
              onChange={(e) => setClienteEmail(e.target.value)}
              placeholder="cliente@email.com"
              required
            />
            <InfoText>
              Informe o email do cliente para quem a consulta será marcada
            </InfoText>
          </FormGroup>

          <FormGroup>
            <Label>Data da Consulta*</Label>
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
            <Label>Observações da Consulta</Label>
            <Input
              as="textarea"
              rows="4"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Adicione observações importantes sobre a consulta (motivo, sintomas, etc.)..."
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
            disabled={submitting || !clienteEmail || !dataAgendamento || !horaSelecionada}
          >
            {submitting ? 'Marcando Consulta...' : 'Marcar Consulta'}
          </Button>
        </Form>
      </ScheduleContainer>
    </Container>
  );
}

export default MarcarConsultaComponent;