import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../services/api.config';
import ConsultaService from '../../services/consulta.service';

const API_URL = process.env.REACT_APP_API_URL;

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

const CategoryTitle = styled.h4`
  font-size: 1.1rem;
  color: #34495e;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 1px dashed #ecf0f1;
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
  const [consultasHistorico, setConsultasHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoricoConsultas();
  }, []);

  const fetchHistoricoConsultas = async () => {
    try {
      setLoading(true);
      console.log("Iniciando busca de histórico de consultas");
      
      const consultas = await ConsultaService.getConsultasByCliente();
      console.log("Consultas recebidas:", consultas);
      
      // Filtrando consultas concluídas ou canceladas
      const historicoConsultas = consultas.filter(
        consulta => {
          console.log("Verificando status:", consulta.status);
          return consulta.status?.nome === 'Finalizada' || 
                 consulta.status?.nome === 'Concluída' || 
                 consulta.status?.nome === 'Cancelada';
        }
      );
      
      console.log("Histórico filtrado:", historicoConsultas);
      const historicoOrdenado = historicoConsultas.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));
setConsultasHistorico(historicoOrdenado || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar histórico de consultas:', error);
      toast.error('Erro ao carregar seu histórico de consultas');
      setLoading(false);
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
        <SectionTitle>
          Meu Histórico
          <button 
            onClick={() => {
              setLoading(true);
              fetchHistoricoConsultas();
            }}
            style={{
              padding: '5px 10px',
              fontSize: '0.8rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Recarregar
          </button>
        </SectionTitle>
        
        {loading ? (
          <EmptyState>Carregando histórico...</EmptyState>
        ) : (
          consultasHistorico.length > 0 ? (
            consultasHistorico.map(consulta => (
              <ListItem key={consulta.id}>
                <span className="date">{formatDate(consulta.data_hora)}</span>
                <span className="description">
                  Consulta {consulta.observacoes ? `- ${consulta.observacoes}` : ''}
                </span>
                <span className={`status ${(consulta.status?.nome === 'Finalizada' || consulta.status?.nome === 'Concluída') ? 'concluido' : 'cancelado'}`}>
                  {consulta.status?.nome || 'Desconhecido'}
                </span>
              </ListItem>
            ))
          ) : (
            <EmptyState>Você ainda não tem histórico de consultas.</EmptyState>
          )
        )}
      </HistoryContainer>
    </Container>
  );
}

export default ClienteHistoricoPage;
