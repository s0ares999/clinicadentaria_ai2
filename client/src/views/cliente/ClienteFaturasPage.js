import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import FaturaService from '../../services/fatura.service';

const FaturasContainer = styled.div`
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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? '#3498db' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  }
`;

const FaturasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FaturaItem = styled.div`
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
`;

const FaturaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ecf0f1;
`;

const FaturaInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FaturaNumber = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const FaturaDate = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const FaturaStatus = styled.div`
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &.emitida {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.paga {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`;

const FaturaBody = styled.div`
  padding: 1rem;
`;

const FaturaDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    color: #7f8c8d;
  }
  
  .value {
    font-weight: 500;
    color: #2c3e50;
  }
`;

const FaturaActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #ecf0f1;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#f39c12' : '#3498db'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.secondary ? '#d35400' : '#2980b9'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
`;

function ClienteFaturasPage() {
  const [faturas, setFaturas] = useState([]);
  const [activeTab, setActiveTab] = useState('todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFaturas();
  }, []);

  const carregarFaturas = async () => {
    try {
      setLoading(true);
      const response = await FaturaService.getFaturasByCliente();
      console.log('Faturas carregadas:', response);
      setFaturas(response || []);
    } catch (error) {
      console.error('Erro ao carregar faturas:', error);
      toast.error('Não foi possível carregar suas faturas');
    } finally {
      setLoading(false);
    }
  };

  const confirmarPagamento = async (faturaId) => {
    try {
      await FaturaService.marcarComoPaga(faturaId);
      toast.success('Pagamento confirmado com sucesso!');
      carregarFaturas();
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      toast.error('Não foi possível confirmar o pagamento');
    }
  };

  const formatarData = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT');
  };

  const formatarValor = (valor) => {
    return `${parseFloat(valor).toFixed(2)}€`;
  };

  const getStatusClass = (statusNome) => {
    if (!statusNome) return '';
    
    const status = statusNome.toLowerCase();
    switch(status) {
      case 'emitida':
        return 'emitida';
      case 'paga':
        return 'paga';
      case 'cancelada':
        return 'cancelada';
      default:
        return '';
    }
  };

  const filtrarFaturas = () => {
    if (activeTab === 'todas') return faturas;
    return faturas.filter(fatura => 
      fatura.status?.nome.toLowerCase() === activeTab
    );
  };

  const faturasExibidas = filtrarFaturas();

  const visualizarPDF = (faturaId) => {
    const pdfUrl = FaturaService.getPDFUrl(faturaId);
    window.open(pdfUrl, '_blank');
  };

  return (
    <FaturasContainer>
      <SectionTitle>
        Minhas Faturas
        <Button onClick={carregarFaturas}>
          <i className="fas fa-sync"></i> Atualizar
        </Button>
      </SectionTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'todas'} 
          onClick={() => setActiveTab('todas')}
        >
          Todas
        </Tab>
        <Tab 
          active={activeTab === 'emitida'} 
          onClick={() => setActiveTab('emitida')}
        >
          Pendentes
        </Tab>
        <Tab 
          active={activeTab === 'paga'} 
          onClick={() => setActiveTab('paga')}
        >
          Pagas
        </Tab>
      </TabsContainer>
      
      {loading ? (
        <EmptyState>Carregando faturas...</EmptyState>
      ) : faturasExibidas.length > 0 ? (
        <FaturasList>
          {faturasExibidas.map(fatura => (
            <FaturaItem key={fatura.id}>
              <FaturaHeader>
                <FaturaInfo>
                  <FaturaNumber>Fatura #{fatura.id}</FaturaNumber>
                  <FaturaDate>Emitida em: {formatarData(fatura.createdAt)}</FaturaDate>
                </FaturaInfo>
                <FaturaStatus className={getStatusClass(fatura.status?.nome)}>
                  {fatura.status?.nome || 'Desconhecido'}
                </FaturaStatus>
              </FaturaHeader>
              
              <FaturaBody>
                <FaturaDetail>
                  <span className="label">Consulta:</span>
                  <span className="value">
                    {fatura.consulta ? formatarData(fatura.consulta.data_hora) : 'N/A'}
                  </span>
                </FaturaDetail>
                <FaturaDetail>
                  <span className="label">Descrição:</span>
                  <span className="value">
                    {fatura.observacoes || 'Consulta odontológica'}
                  </span>
                </FaturaDetail>
                <FaturaDetail>
                  <span className="label">Valor:</span>
                  <span className="value" style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                    {formatarValor(fatura.valor_total)}
                  </span>
                </FaturaDetail>
              </FaturaBody>
              
              <FaturaActions>
                <Button onClick={() => visualizarPDF(fatura.id)}>
                  <i className="fas fa-file-pdf"></i> Visualizar PDF
                </Button>
                
                {fatura.status?.nome === 'Emitida' && (
                  <Button secondary onClick={() => confirmarPagamento(fatura.id)} style={{ marginLeft: '10px' }}>
                    Confirmar Pagamento
                  </Button>
                )}
              </FaturaActions>
            </FaturaItem>
          ))}
        </FaturasList>
      ) : (
        <EmptyState>
          Não foram encontradas faturas{activeTab !== 'todas' ? ` com status "${activeTab}"` : ''}.
        </EmptyState>
      )}
    </FaturasContainer>
  );
}

export default ClienteFaturasPage; 