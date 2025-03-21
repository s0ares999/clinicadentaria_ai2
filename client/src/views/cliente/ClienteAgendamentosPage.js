import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api.config';
import ConsultaService from '../../services/consulta.service';

const API_URL = "http://localhost:8000/api";

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

const ActionButton = styled(Link)`
  background-color: ${props => props.primary ? '#3498db' : '#e74c3c'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#c0392b'};
  }
  
  i {
    font-size: 0.8rem;
  }
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
  
  .doctor {
    font-size: 0.9rem;
    color: #3498db;
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

const Button = styled.button`
  background-color: ${props => props.danger ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.danger ? '#c0392b' : '#2980b9'};
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

function ClienteAgendamentosPage() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      setLoading(true);
      // Get consultations for the current client
      const response = await ConsultaService.getConsultasByCliente();
      console.log('Consultas recebidas:', response.data);
      
      // Sort consultations by date (most recent first)
      const sortedConsultas = response.data.sort((a, b) => {
        return new Date(b.data_hora) - new Date(a.data_hora);
      });
      
      setConsultas(sortedConsultas || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      setConsultas([]);
      setLoading(false);
      toast.error('Erro ao carregar suas consultas');
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
      try {
        await ConsultaService.cancelConsulta(id);
        toast.success('Consulta cancelada com sucesso');
        fetchConsultas();
      } catch (error) {
        console.error('Erro ao cancelar consulta:', error);
        toast.error('Erro ao cancelar consulta');
      }
    }
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    
    console.log('Status recebido:', status);
    
    switch (status.nome?.toLowerCase()) {
      case 'confirmada':
        return 'confirmado';
      case 'agendada':
        return 'pendente';
      case 'cancelada':
        return 'cancelado';
      case 'finalizada':
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
          Minhas Consultas
          <ActionButton to="/cliente-dashboard/agendamentos/novo-agendamento" primary>
            <i className="fas fa-plus"></i> Nova Consulta
          </ActionButton>
        </SectionTitle>
        
        <AppointmentList>
          {loading ? (
            <EmptyState>
              <p>Carregando consultas...</p>
            </EmptyState>
          ) : consultas.length > 0 ? (
            consultas.map(consulta => (
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
                    {consulta.status?.nome || 'Pendente'}
                  </span>
                  {(consulta.status?.nome === 'Agendada') && (
                    <Button 
                      danger
                      onClick={() => handleCancelAppointment(consulta.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </AppointmentItem>
            ))
          ) : (
            <EmptyState>
              <p>Você não tem nenhuma consulta agendada.</p>
              <ActionButton to="/cliente-dashboard/agendamentos/novo-agendamento" primary>
                Agendar Consulta
              </ActionButton>
            </EmptyState>
          )}
        </AppointmentList>
      </AppointmentsContainer>
    </Container>
  );
}

export default ClienteAgendamentosPage;
