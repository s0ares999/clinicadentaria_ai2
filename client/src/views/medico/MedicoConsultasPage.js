import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import ConsultaService from '../../services/consulta.service';
import AuthService from '../../services/auth.service';
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
  
  &.pendente {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.confirmada {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.concluida {
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
  font-size: 0.85rem;
  
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

const RefreshButton = styled.button`
  background-color: #34495e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    background-color: #2c3e50;
  }
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
      console.log('Buscando consultas para o médico...');
      
      // Usando o método correto do service
      const response = await ConsultaService.getConsultasMedico();
      console.log('Consultas recebidas:', response);
      
      let filteredConsultas = response || [];
      
      // Filtrar consultas baseado na tab ativa
      if (activeTab === 'pendentes') {
        filteredConsultas = filteredConsultas.filter(consulta => 
          consulta.status?.nome === 'Pendente'
        );
      } else if (activeTab === 'confirmadas') {
        filteredConsultas = filteredConsultas.filter(consulta => 
          consulta.status?.nome === 'Confirmada'
        );
      } else if (activeTab === 'concluidas') {
        filteredConsultas = filteredConsultas.filter(consulta => 
          consulta.status?.nome === 'Concluída'
        );
      } else if (activeTab === 'canceladas') {
        filteredConsultas = filteredConsultas.filter(consulta => 
          consulta.status?.nome === 'Cancelada'
        );
      }
      
      setConsultas(filteredConsultas);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      toast.error('Erro ao carregar suas consultas');
      setConsultas([]);
      setLoading(false);
    }
  };

  const handleAceitarConsulta = async (id) => {
    try {
      await ConsultaService.aceitarConsulta(id);
      toast.success('Consulta aceita com sucesso');
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao aceitar consulta:', error);
      toast.error('Erro ao aceitar consulta');
    }
  };

  const handleRecusarConsulta = async (id) => {
    try {
      await ConsultaService.recusarConsulta(id);
      toast.success('Consulta recusada');
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao recusar consulta:', error);
      toast.error('Erro ao recusar consulta');
    }
  };

  const handleFinalizarConsulta = async (id) => {
    try {
      const observacoes = prompt('Digite suas observações sobre a consulta (opcional):');
      if (observacoes !== null) { // Não cancelou o prompt
        await ConsultaService.finalizarConsulta(id, observacoes || '');
        toast.success('Consulta finalizada com sucesso');
        fetchConsultas();
      }
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
      case 'pendente':
        return 'pendente';
      case 'confirmada':
        return 'confirmada';
      case 'concluída':
        return 'concluida';
      case 'cancelada':
        return 'cancelada';
      default:
        return '';
    }
  };

  const criarFatura = async (consulta) => {
    try {
      const valor = prompt('Digite o valor da consulta (€):', '50.00');
      if (valor && parseFloat(valor) > 0) {
        await FaturaService.criarFatura(consulta.id, {
          valor_total: parseFloat(valor),
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

  const visualizarFatura = async (consulta) => {
    try {
      const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
      if (fatura && fatura.id) {
        const pdfUrl = FaturaService.getPDFUrl(fatura.id);
        window.open(pdfUrl, '_blank');
      } else {
        toast.error('Fatura não encontrada para esta consulta');
      }
    } catch (error) {
      console.error('Erro ao visualizar fatura:', error);
      toast.error('Erro ao visualizar fatura');
    }
  };

  return (
    <Container>
      <Title>Minhas Consultas</Title>
      
      <RefreshButton onClick={fetchConsultas}>
        Atualizar Consultas
      </RefreshButton>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'todas'} 
          onClick={() => setActiveTab('todas')}
        >
          Todas
        </Tab>
        <Tab 
          active={activeTab === 'pendentes'} 
          onClick={() => setActiveTab('pendentes')}
        >
          Pendentes
        </Tab>
        <Tab 
          active={activeTab === 'confirmadas'} 
          onClick={() => setActiveTab('confirmadas')}
        >
          Confirmadas
        </Tab>
        <Tab 
          active={activeTab === 'concluidas'} 
          onClick={() => setActiveTab('concluidas')}
        >
          Concluídas
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
                  <th>Observações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map(consulta => (
                  <tr key={consulta.id}>
                    <td>{formatarData(consulta.data_hora)}</td>
                    <td>{formatarHora(consulta.data_hora)}</td>
                    <td>{consulta.utilizador?.nome || 'Paciente não identificado'}</td>
                    <td>
                      <Status className={getStatusClass(consulta.status)}>
                        {consulta.status?.nome || 'Status desconhecido'}
                      </Status>
                    </td>
                    <td>{consulta.observacoes || 'Sem observações'}</td>
                    <td>
                      {consulta.status?.nome === 'Pendente' && (
                        <>
                          <Button 
                            color="#2ecc71"
                            hoverColor="#27ae60"
                            onClick={() => handleAceitarConsulta(consulta.id)}
                          >
                            Aceitar
                          </Button>
                          <Button 
                            color="#e74c3c"
                            hoverColor="#c0392b"
                            onClick={() => handleRecusarConsulta(consulta.id)}
                          >
                            Recusar
                          </Button>
                        </>
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
                        <Button 
                          color="#f39c12"
                          hoverColor="#e67e22"
                          onClick={() => criarFatura(consulta)}
                        >
                          Criar Fatura
                        </Button>
                      )}
                      
                      {consulta.status?.nome === 'Concluída' && consulta.tem_fatura && (
                        <Button 
                          color="#3498db"
                          hoverColor="#2980b9"
                          onClick={() => visualizarFatura(consulta)}
                        >
                          Ver Fatura
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyMessage>
              {activeTab === 'todas' ? 'Nenhuma consulta encontrada' : 
               `Nenhuma consulta ${activeTab} encontrada`}
            </EmptyMessage>
          )
        )}
      </ConsultasContainer>
    </Container>
  );
}

export default MedicoConsultasPage;