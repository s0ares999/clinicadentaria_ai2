import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api.config';
import FaturaService from '../../services/fatura.service';

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

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
`;

const FaturasPage = () => {
  const navigate = useNavigate();
  const [faturas, setFaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaturas();
  }, []);

  const fetchFaturas = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Usando o endpoint correto do seu controller
      const response = await api.get('/faturas');
      
      if (response.data && response.data.faturas) {
        setFaturas(response.data.faturas);
      } else {
        setFaturas([]);
      }
      
    } catch (error) {
      console.error('Erro ao buscar faturas:', error);
      setError('Erro ao carregar faturas. Tente novamente.');
      setFaturas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const getStatusBadgeClass = (status) => {
    if (!status || !status.nome) return '';
    
    switch (status.nome.toLowerCase()) {
      case 'paga':
      case 'pago':
        return 'paga';
      case 'pendente':
        return 'pendente';
      case 'cancelada':
      case 'cancelado':
        return 'cancelada';
      default:
        return '';
    }
  };

  const handleViewDetails = (fatura) => {
    navigate(`/dashboard/faturas/${fatura.id}`);
  };


  const handleDeleteFatura = async (faturaId) => {
    if (window.confirm('Tem certeza que deseja deletar esta fatura?')) {
      try {
        await FaturaService.deletarFatura(faturaId);
        setFaturas(faturas.filter(f => f.id !== faturaId));
        console.log('Fatura deletada com sucesso');
      } catch (error) {
        console.error('Erro ao deletar fatura:', error);
        setError('Erro ao deletar fatura');
      }
    }
  };

  // Filtrar faturas baseado no termo de pesquisa
  const faturasFiltradas = faturas.filter(fatura => {
    if (!searchTerm) return true;
    
    const termo = searchTerm.toLowerCase();
    const nomeCliente = fatura.consulta?.utilizador?.nome?.toLowerCase() || '';
    const nomeMedico = fatura.consulta?.medico?.nome?.toLowerCase() || '';
    const faturaId = fatura.id?.toString() || '';
    
    return nomeCliente.includes(termo) || 
           nomeMedico.includes(termo) || 
           faturaId.includes(termo);
  });

  return (
    <>
      <PageTitle>Gestão de Faturas</PageTitle>
      
      <Card>
        <SearchAndAddSection>
          <SearchBar>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Pesquisar por cliente, médico ou ID..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          
          <AddButton onClick={() => console.log('Criar nova fatura')}>
            <i className="fas fa-plus"></i>
            Criar Nova Fatura
          </AddButton>
        </SearchAndAddSection>

        {error && (
          <ErrorMessage>
            {error}
            <button 
              onClick={fetchFaturas}
              style={{ 
                marginLeft: '10px', 
                background: 'none', 
                border: 'none', 
                color: '#721c24',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Tentar novamente
            </button>
          </ErrorMessage>
        )}
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <i className="fas fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
            Carregando faturas...
          </div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Médico</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Serviços</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {faturasFiltradas.length > 0 ? (
                faturasFiltradas.map((fatura) => (
                  <tr key={fatura.id}>
                    <td>#{fatura.id}</td>
                    <td>{fatura.consulta?.utilizador?.nome || 'N/A'}</td>
                    <td>{fatura.consulta?.medico?.nome || 'N/A'}</td>
                    <td>{formatDate(fatura.createdAt)}</td>
                    <td>{formatCurrency(fatura.valor_total)}</td>
                    <td>
                      <StatusBadge className={getStatusBadgeClass(fatura.status)}>
                        {fatura.status?.nome || 'N/A'}
                      </StatusBadge>
                    </td>
                    <td>
                      {fatura.servicos?.length || 0} serviço(s)
                    </td>
                    <td>
                      <ActionButton 
                        onClick={() => handleViewDetails(fatura)}
                        title="Ver detalhes"
                      >
                        <i className="fas fa-eye"></i>
                      </ActionButton>
                    
                      <ActionButton 
                        onClick={() => handleDeleteFatura(fatura.id)}
                        color="#e74c3c"
                        hoverColor="#c0392b"
                        title="Deletar"
                      >
                        <i className="fas fa-trash"></i>
                      </ActionButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                    {searchTerm ? 'Nenhuma fatura encontrada com os critérios de pesquisa' : 'Nenhuma fatura encontrada'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
};

export default FaturasPage;