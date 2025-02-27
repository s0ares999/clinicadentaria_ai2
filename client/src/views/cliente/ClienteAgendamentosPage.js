import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import authHeader from '../../services/auth-header';
import { Link } from 'react-router-dom';

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

const SectionTitle = styled.h3`
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
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.secondary ? '#ecf0f1' : props.danger ? '#e74c3c' : '#3498db'};
  color: ${props => props.secondary ? '#2c3e50' : 'white'};
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.secondary ? '#dfe6e9' : props.danger ? '#c0392b' : '#2980b9'};
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  & + & {
    margin-left: 1rem;
  }
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary ? '#3498db' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#3498db'};
  border: 2px solid ${props => props.primary ? '#3498db' : '#3498db'};
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#f8f9fa'};
    color: ${props => props.primary ? '#fff' : '#2980b9'};
    border-color: ${props => props.primary ? '#2980b9' : '#2980b9'};
  }

  i {
    margin-right: 10px;
  }
`;

function ClienteAgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAgendamentos();
  }, []);

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

  return (
    <Container>
      <AppointmentsContainer>
        <SectionTitle>
          Meus Agendamentos
          <ActionButton to="/cliente-dashboard/agendamentos/novo-agendamento" primary>
            <i className="fas fa-plus"></i> Nova Consulta
          </ActionButton>
        </SectionTitle>
        
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
