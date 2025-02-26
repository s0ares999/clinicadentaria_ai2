import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import authHeader from '../../services/auth-header';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const HistoryContainer = styled.div`
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

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HistoryItem = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  
  .title {
    font-weight: 600;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .date {
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  .details {
    margin-bottom: 1rem;
    color: #34495e;
    line-height: 1.6;
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #7f8c8d;
    
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      
      &.completed {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      
      &.canceled {
        background-color: #ffebee;
        color: #c62828;
      }
      
      &.pending {
        background-color: #fff8e1;
        color: #f57f17;
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

const Tabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-weight: 500;
  color: ${props => props.active ? '#3498db' : '#7f8c8d'};
  border-bottom: 2px solid ${props => props.active ? '#3498db' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #3498db;
  }
`;

function ClienteHistoricoPage() {
  const [historico, setHistorico] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('consultas');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (activeTab === 'consultas') {
      fetchHistoricoConsultas();
    } else {
      fetchHistoricoCliente();
    }
  }, [activeTab]);

  const fetchHistoricoConsultas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/agendamentos/cliente`, { 
        headers: authHeader()
      });
      
      // Filtrar apenas os agendamentos concluídos ou cancelados
      const historicoAgendamentos = response.data.filter(
        agendamento => agendamento.estado === 'Concluído' || agendamento.estado === 'Cancelado'
      );
      
      setAgendamentos(historicoAgendamentos || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar histórico de consultas:', error);
      setLoading(false);
      toast.error('Erro ao carregar seu histórico de consultas');
    }
  };

  const fetchHistoricoCliente = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/clientes/profile`, { 
        headers: authHeader()
      });
      
      if (response.data && response.data.historico) {
        setHistorico(response.data.historico || []);
      } else {
        setHistorico([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar histórico do cliente:', error);
      setLoading(false);
      toast.error('Erro ao carregar seu histórico');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return 'completed';
      case 'cancelado':
        return 'canceled';
      case 'pendente':
        return 'pending';
      default:
        return '';
    }
  };

  return (
    <HistoryContainer>
      <SectionTitle>Histórico</SectionTitle>
      
      <Tabs>
        <Tab 
          active={activeTab === 'consultas'} 
          onClick={() => setActiveTab('consultas')}
        >
          Consultas
        </Tab>
        <Tab 
          active={activeTab === 'geral'} 
          onClick={() => setActiveTab('geral')}
        >
          Histórico Geral
        </Tab>
      </Tabs>
      
      {activeTab === 'consultas' ? (
        <HistoryList>
          {loading ? (
            <EmptyState>
              <p>Carregando histórico de consultas...</p>
            </EmptyState>
          ) : agendamentos.length > 0 ? (
            agendamentos.map(item => (
              <HistoryItem key={item.id}>
                <div className="header">
                  <div className="title">{item.servico || 'Consulta Geral'}</div>
                  <div className="date">
                    {formatDate(item.dataHora)} às {formatTime(item.dataHora)}
                  </div>
                </div>
                <div className="details">
                  {item.observacoes || 'Sem observações registradas para esta consulta.'}
                </div>
                <div className="meta">
                  <div>Dentista: {item.dentista || 'Não especificado'}</div>
                  <div className={`status ${getStatusClass(item.estado)}`}>
                    {item.estado}
                  </div>
                </div>
              </HistoryItem>
            ))
          ) : (
            <EmptyState>
              <i className="fas fa-history"></i>
              <h3>Nenhuma consulta no histórico</h3>
              <p>Você ainda não realizou nenhuma consulta em nossa clínica.</p>
            </EmptyState>
          )}
        </HistoryList>
      ) : (
        <HistoryList>
          {loading ? (
            <EmptyState>
              <p>Carregando histórico...</p>
            </EmptyState>
          ) : historico.length > 0 ? (
            historico.map((item, index) => (
              <HistoryItem key={index}>
                <div className="header">
                  <div className="title">{item.tipo}</div>
                  <div className="date">{formatDate(item.data)}</div>
                </div>
                <div className="details">
                  {item.descricao}
                </div>
              </HistoryItem>
            ))
          ) : (
            <EmptyState>
              <i className="fas fa-history"></i>
              <h3>Nenhum registro no histórico</h3>
              <p>Ainda não há registros em seu histórico.</p>
            </EmptyState>
          )}
        </HistoryList>
      )}
    </HistoryContainer>
  );
}

export default ClienteHistoricoPage;
