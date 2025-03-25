import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ConsultaService from '../../services/consulta.service';
import AuthService from '../../services/auth.service';
import CriarFaturaButton from '../../components/CriarFaturaButton';
import FaturaService from '../../services/fatura.service';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? '#3498db' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  }
`;

const ConsultasContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f8f9fa;
  }
`;

const Status = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &.agendada {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.confirmada {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.finalizada {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`;

const Button = styled.button`
  background-color: ${props => props.color || '#3498db'};
  color: white;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  
  &:hover {
    background-color: ${props => props.hoverColor || '#2980b9'};
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #95a5a6;
`;

function MedicoConsultasPage() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('todas');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    fetchConsultas();
  }, [activeTab]);

  const fetchConsultas = async () => {
    try {
      setLoading(true);
      const response = await ConsultaService.getConsultasByMedico(currentUser.user.id);
      
      let filteredConsultas = response.data;
      
      if (activeTab === 'agendadas') {
        filteredConsultas = response.data.filter(consulta => 
          consulta.status?.nome === 'Agendada' || consulta.status?.nome === 'Confirmada'
        );
      } else if (activeTab === 'finalizadas') {
        filteredConsultas = response.data.filter(consulta => 
          consulta.status?.nome === 'Finalizada'
        );
      } else if (activeTab === 'canceladas') {
        filteredConsultas = response.data.filter(consulta => 
          consulta.status?.nome === 'Cancelada'
        );
      }
      
      setConsultas(filteredConsultas);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      toast.error('Erro ao carregar suas consultas');
      setLoading(false);
    }
  };

  const handleConfirmarConsulta = async (id) => {
    try {
      await ConsultaService.updateConsulta(id, { 
        status_id: 2 // Assumindo que o ID 2 é para o status "Confirmada" 
      });
      toast.success('Consulta confirmada com sucesso');
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao confirmar consulta:', error);
      toast.error('Erro ao confirmar consulta');
    }
  };

  const handleFinalizarConsulta = async (id) => {
    try {
      await ConsultaService.updateConsulta(id, { 
        status_id: 3 // Assumindo que o ID 3 é para o status "Finalizada" 
      });
      toast.success('Consulta finalizada com sucesso');
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao finalizar consulta:', error);
      toast.error('Erro ao finalizar consulta');
    }
  };

  const formatarData = (dataHora) => {
    const data = new Date(dataHora);
    return data.toLocaleDateString('pt-PT');
  };

  const formatarHora = (dataHora) => {
    const data = new Date(dataHora);
    return data.toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch (status.nome?.toLowerCase()) {
      case 'agendada':
        return 'agendada';
      case 'confirmada':
        return 'confirmada';
      case 'finalizada':
        return 'finalizada';
      case 'cancelada':
        return 'cancelada';
      default:
        return '';
    }
  };

  const criarFatura = async (consulta) => {
    try {
      if (window.confirm(`Deseja criar uma fatura para a consulta #${consulta.id}?`)) {
        await FaturaService.criarFatura(consulta.id, {
          valor_total: 50.00,
          observacoes: `Consulta realizada em ${formatarData(consulta.data_hora)}`,
          status_id: 1
        });
        
        toast.success('Fatura criada com sucesso');
        fetchConsultas();
      }
    } catch (error) {
      console.error('Erro ao criar fatura:', error);
      toast.error('Erro ao criar fatura');
    }
  };

  return (
    <Container>
      <Title>Minhas Consultas</Title>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'todas'} 
          onClick={() => setActiveTab('todas')}
        >
          Todas
        </Tab>
        <Tab 
          active={activeTab === 'agendadas'} 
          onClick={() => setActiveTab('agendadas')}
        >
          Agendadas
        </Tab>
        <Tab 
          active={activeTab === 'finalizadas'} 
          onClick={() => setActiveTab('finalizadas')}
        >
          Finalizadas
        </Tab>
        <Tab 
          active={activeTab === 'canceladas'} 
          onClick={() => setActiveTab('canceladas')}
        >
          Canceladas
        </Tab>
      </TabsContainer>
      
      <ConsultasContainer>
        {loading ? (
          <EmptyMessage>Carregando consultas...</EmptyMessage>
        ) : (
          consultas.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Paciente</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map(consulta => (
                  <tr key={consulta.id}>
                    <td>{formatarData(consulta.data_hora)}</td>
                    <td>{formatarHora(consulta.data_hora)}</td>
                    <td>{consulta.cliente?.nome || 'Paciente'}</td>
                    <td>
                      <Status className={getStatusClass(consulta.status)}>
                        {consulta.status?.nome || 'Status desconhecido'}
                      </Status>
                    </td>
                    <td>
                      {consulta.status?.nome === 'Agendada' && (
                        <Button onClick={() => handleConfirmarConsulta(consulta.id)}>
                          Confirmar
                        </Button>
                      )}
                      {consulta.status?.nome === 'Confirmada' && (
                        <Button 
                          color="#2ecc71"
                          hoverColor="#27ae60"
                          onClick={() => handleFinalizarConsulta(consulta.id)}
                        >
                          Finalizar
                        </Button>
                      )}
                      {consulta.status?.nome === 'Concluída' && !consulta.tem_fatura && (
                        <Button onClick={() => criarFatura(consulta)}>
                          <i className="fas fa-file-invoice"></i> Criar Fatura
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyMessage>Nenhuma consulta encontrada</EmptyMessage>
          )
        )}
      </ConsultasContainer>
    </Container>
  );
}

export default MedicoConsultasPage; 