import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import authHeader from '../../services/auth-header';
import ConsultaService from '../../services/consulta.service';

const API_URL = "http://localhost:8000/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

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

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? '#3498db' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
  
  .date {
    font-weight: 500;
    color: #2c3e50;
  }
  
  .description {
    flex: 1;
    margin-left: 1.5rem;
    color: #7f8c8d;
  }
  
  .status {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
    border-radius: 50px;
    
    &.concluido {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    &.cancelado {
      background-color: #ffebee;
      color: #d32f2f;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

function ClienteHistoricoPage() {
  const [historico, setHistorico] = useState([]);
  const [consultasHistorico, setConsultasHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('consultas');

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
      const response = await ConsultaService.getConsultasByCliente();
      
      // Filtrar apenas as consultas finalizadas ou canceladas
      const historicoConsultas = response.data.filter(
        consulta => consulta.status?.nome === 'Finalizada' || consulta.status?.nome === 'Cancelada'
      );
      
      setConsultasHistorico(historicoConsultas || []);
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

  return (
    <Container>
      <HistoryContainer>
        <SectionTitle>Meu Histórico</SectionTitle>
        
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
        
        {loading ? (
          <EmptyState>Carregando histórico...</EmptyState>
        ) : (
          activeTab === 'consultas' ? (
            consultasHistorico.length > 0 ? (
              consultasHistorico.map(consulta => (
                <ListItem key={consulta.id}>
                  <span className="date">{formatDate(consulta.data_hora)}</span>
                  <span className="description">
                    Consulta com Dr(a). {consulta.medico?.nome || 'Médico'}
                  </span>
                  <span className={`status ${consulta.status?.nome === 'Finalizada' ? 'concluido' : 'cancelado'}`}>
                    {consulta.status?.nome || 'Desconhecido'}
                  </span>
                </ListItem>
              ))
            ) : (
              <EmptyState>Você ainda não tem histórico de consultas.</EmptyState>
            )
          ) : (
            historico.length > 0 ? (
              historico.map((item, index) => (
                <ListItem key={index}>
                  <span className="date">{formatDate(item.data)}</span>
                  <span className="description">{item.descricao}</span>
                </ListItem>
              ))
            ) : (
              <EmptyState>Você ainda não tem histórico geral registrado.</EmptyState>
            )
          )
        )}
      </HistoryContainer>
    </Container>
  );
}

export default ClienteHistoricoPage;
