import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api.config';

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SearchAndAddSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 15px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #2c3e50;
  }

  i {
    color: #7f8c8d;
    margin-right: 10px;
  }
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  i {
    margin-right: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e1e5e8;
  }

  th {
    font-weight: 600;
    color: #7f8c8d;
    background-color: #f8f9fa;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#3498db'};
  cursor: pointer;
  margin-right: 10px;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.hoverColor || '#2980b9'};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  &.paga {
    background-color: #2ecc71;
    color: white;
  }
  
  &.pendente {
    background-color: #f39c12;
    color: white;
  }
  
  &.cancelada {
    background-color: #e74c3c;
    color: white;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 5px;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : '#fff'};
  color: ${props => props.active ? '#fff' : '#2c3e50'};
  border: 1px solid #e1e5e8;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const API_URL = 'http://localhost:8000/api';

const FaturasPage = () => {
  const [faturas, setFaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFaturas();
  }, [currentPage]);

  const fetchFaturas = async () => {
    try {
      setLoading(true);
      const response = await api.get('faturas', { 
        params: { page: currentPage - 1, size: 10 }
      });
      setFaturas(response.data.items || []);
      setTotalPages(Math.ceil((response.data.total || 0) / 10));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching faturas:', error);
      setLoading(false);
      // Adicionar notificação de erro quando tivermos react-toastify
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implementar lógica de pesquisa quando tiver backend
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paga':
        return 'paga';
      case 'pendente':
        return 'pendente';
      case 'cancelada':
        return 'cancelada';
      default:
        return '';
    }
  };

  const handleViewDetails = (id) => {
    // Implementar visualização de detalhes
    console.log(`Ver detalhes da fatura ${id}`);
  };

  const handlePrintInvoice = (id) => {
    // Implementar impressão de fatura
    console.log(`Imprimir fatura ${id}`);
  };

  return (
    <>
      <PageTitle>Gestão de Faturas</PageTitle>
      
      <Card>
        <SearchAndAddSection>
          <SearchBar>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Pesquisar faturas..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          
          <AddButton>
            <i className="fas fa-plus"></i>
            Criar Nova Fatura
          </AddButton>
        </SearchAndAddSection>
        
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Nº Fatura</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {faturas.length > 0 ? (
                  faturas.map((fatura) => (
                    <tr key={fatura.id}>
                      <td>#{fatura.numero}</td>
                      <td>{fatura.cliente?.nome || 'Cliente não disponível'}</td>
                      <td>{new Date(fatura.dataEmissao).toLocaleDateString()}</td>
                      <td>{formatCurrency(fatura.valorTotal)}</td>
                      <td>
                        <StatusBadge className={getStatusBadgeClass(fatura.estado)}>
                          {fatura.estado}
                        </StatusBadge>
                      </td>
                      <td>
                        <ActionButton onClick={() => handleViewDetails(fatura.id)}>
                          <i className="fas fa-eye"></i>
                        </ActionButton>
                        <ActionButton onClick={() => handlePrintInvoice(fatura.id)}>
                          <i className="fas fa-print"></i>
                        </ActionButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                      Nenhuma fatura encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            
            <Pagination>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </PageButton>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PageButton 
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ))}
              
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-chevron-right"></i>
              </PageButton>
            </Pagination>
          </>
        )}
      </Card>
    </>
  );
};

export default FaturasPage;
