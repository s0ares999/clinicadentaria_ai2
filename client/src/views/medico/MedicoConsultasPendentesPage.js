import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ConsultaService from '../../services/consulta.service';
import AuthService from '../../services/auth.service';

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const PendingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  tr:hover {
    background-color: #f1f2f3;
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.accept ? '#2ecc71' : '#e74c3c'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.accept ? '#27ae60' : '#c0392b'};
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

function MedicoConsultasPendentesPage() {
  const [pendingConsultas, setPendingConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    fetchPendingConsultas();
  }, []);

  const fetchPendingConsultas = async () => {
    try {
      setLoading(true);
      const response = await ConsultaService.getConsultasPendentes();
      setPendingConsultas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar consultas pendentes:', error);
      toast.error('Erro ao carregar consultas pendentes');
      setLoading(false);
    }
  };

  const handleAcceptConsulta = async (id) => {
    try {
      await ConsultaService.aceitarConsulta(id);
      toast.success('Consulta aceita com sucesso!');
      fetchPendingConsultas();
    } catch (error) {
      console.error('Erro ao aceitar consulta:', error);
      toast.error('Erro ao aceitar consulta');
    }
  };

  const handleDeclineConsulta = async (id) => {
    try {
      await ConsultaService.recusarConsulta(id);
      toast.success('Consulta recusada');
      fetchPendingConsultas();
    } catch (error) {
      console.error('Erro ao recusar consulta:', error);
      toast.error('Erro ao recusar consulta');
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
      <Title>Consultas Pendentes</Title>
      
      {loading ? (
        <EmptyState>Carregando consultas pendentes...</EmptyState>
      ) : pendingConsultas.length > 0 ? (
        <PendingTable>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Tratamento</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pendingConsultas.map(consulta => (
              <tr key={consulta.id}>
                <td>{formatDate(consulta.data_hora)}</td>
                <td>{formatTime(consulta.data_hora)}</td>
                <td>{consulta.cliente?.nome || 'Paciente'}</td>
                <td>{consulta.tratamento?.nome || 'Não especificado'}</td>
                <td>{consulta.observacoes || 'Sem observações'}</td>
                <td>
                  <ActionButton 
                    accept 
                    onClick={() => handleAcceptConsulta(consulta.id)}
                  >
                    Aceitar
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleDeclineConsulta(consulta.id)}
                  >
                    Recusar
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </PendingTable>
      ) : (
        <EmptyState>Não há consultas pendentes no momento.</EmptyState>
      )}
    </Container>
  );
}

export default MedicoConsultasPendentesPage; 