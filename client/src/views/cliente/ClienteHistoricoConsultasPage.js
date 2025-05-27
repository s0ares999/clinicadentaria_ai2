import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ConsultaService from '../../services/consulta.service';
import AuthService from '../../services/auth.service';

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

const SectionTitle = styled.div`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ecf0f1;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .appointment-info {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .date-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
  }
  
  .date {
    font-weight: 600;
    font-size: 1.1rem;
    color: #2c3e50;
  }
  
  .time {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .service {
    font-weight: 500;
    color: #2c3e50;
  }
  
  .notes {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .status-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .status {
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .status.confirmado {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  .status.pendente {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  .status.cancelado {
    background-color: #ffebee;
    color: #d32f2f;
  }
  
  .status.concluido {
    background-color: #e3f2fd;
    color: #1976d2;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  
  p {
    margin-bottom: 1rem;
  }
`;

function ClienteHistoricoConsultasPage() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistorico();
  }, []);

  const fetchHistorico = async () => {
    try {
      setLoading(true);
      console.log("Iniciando busca de histórico de consultas...");

      const response = await ConsultaService.getConsultasByCliente();
      console.log("Resposta completa:", response);

      if (!response || !Array.isArray(response)) {
        console.error("Resposta inválida da API:", response);
        setHistorico([]);
        return;
      }

      // Filtrar apenas consultas concluídas ou canceladas
      const historicoConsultas = response.filter(consulta => {
        console.log("Verificando consulta:", consulta);
        return consulta.status?.nome === 'Concluída' ||
          consulta.status?.nome === 'Cancelada';
      });

      console.log("Histórico filtrado:", historicoConsultas);
      const historicoOrdenado = historicoConsultas.sort((b, a) => new Date(b.data_hora) - new Date(a.data_hora));
      setHistorico(historicoOrdenado || []);
    } catch (error) {
      console.error('Erro detalhado ao carregar histórico:', error);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados:', error.response.data);
      }
      toast.error('Não foi possível carregar seu histórico');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return '';

    switch (status.nome?.toLowerCase()) {
      case 'confirmada':
        return 'confirmado';
      case 'pendente':
        return 'pendente';
      case 'cancelada':
        return 'cancelado';
      case 'concluída':
        return 'concluido';
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

  return (
    <Container>
      <AppointmentsContainer>
        <SectionTitle>
          Histórico de Consultas
        </SectionTitle>

        <AppointmentList>
          {loading ? (
            <EmptyState>
              <p>Carregando...</p>
            </EmptyState>
          ) : historico.length > 0 ? (
            historico.map(consulta => (
              <AppointmentItem key={consulta.id}>
                <div className="appointment-info">
                  <div className="date-time">
                    <div className="date">{formatDate(consulta.data_hora)}</div>
                    <div className="time">{formatTime(consulta.data_hora)}</div>
                  </div>
                  <div className="details">
                    <div className="service">
                      Consulta com Dr(a). {consulta.medico?.nome || 'Médico'}
                    </div>
                    <div className="notes">{consulta.observacoes || 'Sem observações'}</div>
                  </div>
                </div>
                <div className="status-actions">
                  <span className={`status ${getStatusClass(consulta.status)}`}>
                    {consulta.status?.nome || 'Status desconhecido'}
                  </span>
                </div>
              </AppointmentItem>
            ))
          ) : (
            <EmptyState>
              <p>Você não tem histórico de consultas.</p>
            </EmptyState>
          )}
        </AppointmentList>
      </AppointmentsContainer>
    </Container>
  );
}

export default ClienteHistoricoConsultasPage; 