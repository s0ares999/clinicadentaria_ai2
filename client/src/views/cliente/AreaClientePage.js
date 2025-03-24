import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;  

const WelcomeSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h1 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    color: #7f8c8d;
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    gap: 15px;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
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

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f1f1;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .icon {
      width: 40px;
      height: 40px;
      background-color: ${props => props.iconBg || '#3498db'};
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 1.2rem;
    }

    h3 {
      margin: 0;
      color: #2c3e50;
    }
  }

  .card-content {
    color: #7f8c8d;
    margin-bottom: 15px;
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
  }
`;

const AppointmentList = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;
`;

const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }

  .appointment-info {
    display: flex;
    align-items: center;

    .date-time {
      min-width: 150px;
      margin-right: 20px;

      .date {
        font-weight: 600;
        color: #2c3e50;
      }

      .time {
        color: #7f8c8d;
        font-size: 0.9rem;
      }
    }

    .details {
      .service {
        font-weight: 500;
        color: #2c3e50;
        margin-bottom: 5px;
      }

      .notes {
        color: #7f8c8d;
        font-size: 0.9rem;
      }
    }
  }

  .status {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    
    &.pendente {
      background-color: #f39c12;
      color: white;
    }
    
    &.confirmado {
      background-color: #2ecc71;
      color: white;
    }
    
    &.cancelado {
      background-color: #e74c3c;
      color: white;
    }
  }

  .actions {
    display: flex;
    gap: 10px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;

  i {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #bdc3c7;
  }

  h3 {
    margin-bottom: 10px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 20px;
  }
`;

const API_URL = 'http://localhost:8000/api';

const AreaClientePage = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      setLoading(true);
      // Change this URL to match your backend route
      const response = await axios.get(`${API_URL}/cliente`, { 
        headers: authHeader()
      });
      setAgendamentos(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      setLoading(false);
      toast.error('Erro ao carregar seus agendamentos');
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
    return date.toLocaleDateString('pt-pt');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-pt', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <PageContainer>
      <WelcomeSection>
        <h1>Bem-vindo, {currentUser?.nome || 'cliente'}!</h1>
        <p>Gerencie suas consultas, veja seu histórico e agende novos atendimentos.</p>
        <div className="actions">
          <ActionButton to="/cliente/agendar" primary>
            <i className="fas fa-calendar-plus"></i> Agendar Consulta
          </ActionButton>
          <ActionButton to="/cliente/perfil">
            <i className="fas fa-user-edit"></i> Editar Perfil
          </ActionButton>
        </div>
      </WelcomeSection>

      <SectionTitle>Próximas Consultas</SectionTitle>
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
                  {agendamento.estado}
                </span>
              </div>
              <div className="actions">
                {agendamento.estado.toLowerCase() === 'pendente' && (
                  <ActionButton 
                    as="button" 
                    onClick={() => handleCancelAppointment(agendamento.id)}
                    style={{ 
                      backgroundColor: '#e74c3c', 
                      borderColor: '#e74c3c',
                      color: 'white',
                      padding: '5px 10px',
                      fontSize: '0.9rem'
                    }}
                  >
                    Cancelar
                  </ActionButton>
                )}
              </div>
            </AppointmentItem>
          ))
        ) : (
          <EmptyState>
            <i className="far fa-calendar-alt"></i>
            <h3>Nenhuma consulta agendada</h3>
            <p>Você ainda não tem consultas agendadas.</p>
            <ActionButton to="/cliente/agendar" primary>
              Agendar Consulta
            </ActionButton>
          </EmptyState>
        )}
      </AppointmentList>

      <SectionTitle>Nossos Serviços</SectionTitle>
      <CardGrid>
        <Card iconBg="#3498db">
          <div className="card-header">
            <div className="icon">
              <i className="fas fa-tooth"></i>
            </div>
            <h3>Limpeza Dentária</h3>
          </div>
          <div className="card-content">
            Mantenha sua saúde bucal em dia com limpezas regulares realizadas por nossos profissionais.
          </div>
          <div className="card-footer">
            <ActionButton to="/cliente/agendar" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Agendar
            </ActionButton>
          </div>
        </Card>

        <Card iconBg="#2ecc71">
          <div className="card-header">
            <div className="icon">
              <i className="fas fa-teeth"></i>
            </div>
            <h3>Consulta de Rotina</h3>
          </div>
          <div className="card-content">
            Consultas regulares são essenciais para prevenir problemas e manter um sorriso saudável.
          </div>
          <div className="card-footer">
            <ActionButton to="/cliente/agendar" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Agendar
            </ActionButton>
          </div>
        </Card>

        <Card iconBg="#9b59b6">
          <div className="card-header">
            <div className="icon">
              <i className="fas fa-teeth-open"></i>
            </div>
            <h3>Branqueamento</h3>
          </div>
          <div className="card-content">
            Tenha um sorriso mais branco e brilhante com nossos tratamentos de branqueamento profissional.
          </div>
          <div className="card-footer">
            <ActionButton to="/cliente/agendar" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              Agendar
            </ActionButton>
          </div>
        </Card>
      </CardGrid>
    </PageContainer>
  );
};

export default AreaClientePage;
