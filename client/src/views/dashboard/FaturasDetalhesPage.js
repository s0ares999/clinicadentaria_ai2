import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api.config';
import PDFGeneratorButton from '../../components/PDFGeneratorButton'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  @media print {
    display: none;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 20px;
  
  &:hover {
    color: #2980b9;
  }
  
  i {
    margin-right: 8px;
  }
  
  @media print {
    display: none;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: stretch;
  }
  
  @media print {
    display: none;
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.variant === 'danger' ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.variant === 'danger' ? '#c0392b' : '#2980b9'};
  }

  i {
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

// Container específico para PDF
const PDFContainer = styled.div`
  background: white;
  
  @media print {
    margin: 0;
    padding: 20px;
    box-shadow: none;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 25px;
  
  @media print {
    box-shadow: none;
    border: 1px solid #ddd;
    border-radius: 0;
    margin-bottom: 20px;
    page-break-inside: avoid;
  }
`;

const CardHeader = styled.div`
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 15px;
  margin-bottom: 25px;
  
  h2 {
    color: #2c3e50;
    margin: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    
    i {
      margin-right: 10px;
      color: #3498db;
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  span {
    color: #2c3e50;
    font-size: 1.1rem;
    padding: 8px 0;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 90px;
  text-align: center;
  
  &.emitida {
    color: #3498db;
    background-color: rgba(52, 152, 219, 0.1);
    border: 1px solid #3498db;
  }
  
  &.paga {
    color: #2ecc71;
    background-color: rgba(46, 204, 113, 0.1);
    border: 1px solid #2ecc71;
  }
  
  &.pendente {
    color: #f39c12;
    background-color: rgba(243, 156, 18, 0.1);
    border: 1px solid #f39c12;
  }
  
  &.cancelada {
    color: #e74c3c;
    background-color: rgba(231, 76, 60, 0.1);
    border: 1px solid #e74c3c;
  }
`;

const ServicesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
  }

  th {
    font-weight: 600;
    color: #7f8c8d;
    background-color: #f8f9fa;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    
    th, td {
      padding: 10px 8px;
    }
  }
  
  @media print {
    tbody tr:hover {
      background-color: transparent;
    }
  }
`;

const TotalSection = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: right;
  
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    
    &.final-total {
      border-top: 2px solid #3498db;
      padding-top: 15px;
      margin-top: 10px;
      font-size: 1.3rem;
      font-weight: 700;
      color: #2c3e50;
    }
  }
`;

const ObservationsSection = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  
  h4 {
    color: #2c3e50;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    
    i {
      margin-right: 8px;
      color: #3498db;
    }
  }
  
  p {
    color: #5d6d7e;
    line-height: 1.6;
    margin: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  flex-direction: column;
  
  i {
    font-size: 3rem;
    color: #3498db;
    margin-bottom: 20px;
  }
  
  p {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`;

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  text-align: center;
  
  button {
    background-color: #721c24;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    
    &:hover {
      background-color: #5a161f;
    }
  }
`;

const FaturaDetalhesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fatura, setFatura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const pdfRef = useRef();

    useEffect(() => {
        fetchFaturaDetalhes();
    }, [id]);

    const fetchFaturaDetalhes = async () => {
        try {
            setLoading(true);
            setError('');

            // Buscar todas as faturas e encontrar a específica
            const response = await api.get('/faturas');
            const faturas = response.data.faturas || [];
            const faturaEncontrada = faturas.find(f => f.id === parseInt(id));

            if (faturaEncontrada) {
                setFatura(faturaEncontrada);
            } else {
                setError('Fatura não encontrada');
            }

        } catch (error) {
            console.error('Erro ao buscar detalhes da fatura:', error);
            setError('Erro ao carregar detalhes da fatura');
        } finally {
            setLoading(false);
        }
    };

    // Callbacks para o PDF
    const handlePDFStart = () => {
        console.log('Iniciando geração do PDF da fatura...');
    };

    const handlePDFSuccess = (pdf) => {
        console.log('PDF da fatura gerado com sucesso!');
        // Aqui você pode adicionar notificações de sucesso, analytics, etc.
    };

    const handlePDFError = (error) => {
        console.error('Erro ao gerar PDF da fatura:', error);
        alert('Erro ao gerar PDF da fatura. Por favor, tente novamente.');
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(value || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Data não disponível';
        return new Date(dateString).toLocaleDateString('pt-PT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Data não disponível';
        return new Date(dateString).toLocaleString('pt-PT');
    };

    const getStatusBadgeClass = (status) => {
        if (!status || !status.nome) return '';
        return status.nome.toLowerCase();
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja deletar esta fatura? Esta ação não pode ser desfeita.')) {
            try {
                await api.delete(`/faturas/${id}`);
                navigate('/faturas');
            } catch (error) {
                console.error('Erro ao deletar fatura:', error);
                alert('Erro ao deletar fatura');
            }
        }
    };

    if (loading) {
        return (
            <Container>
                <LoadingContainer>
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Carregando detalhes da fatura...</p>
                </LoadingContainer>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorContainer>
                    <h3>Erro</h3>
                    <p>{error}</p>
                    <button onClick={fetchFaturaDetalhes}>Tentar Novamente</button>
                </ErrorContainer>
            </Container>
        );
    }

    if (!fatura) {
        return (
            <Container>
                <ErrorContainer>
                    <h3>Fatura não encontrada</h3>
                    <p>A fatura solicitada não foi encontrada.</p>
                    <button onClick={() => navigate(-1)}>Voltar às Faturas</button>
                </ErrorContainer>
            </Container>
        );
    }

    const subtotal = fatura.servicos?.reduce((sum, servico) =>
        sum + parseFloat(servico.FaturaServico?.subtotal || 0), 0) || 0;

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i>
                Voltar às Faturas
            </BackButton>

            <Header>
                <PageTitle>Fatura #{fatura.id}</PageTitle>
                <ActionButtons>
                    <PDFGeneratorButton
                        elementRef={pdfRef}
                        filename={`fatura-${fatura.id}-${new Date().toISOString().split('T')[0]}.pdf`}
                        buttonText="Gerar PDF"
                        loadingText="Gerando PDF..."
                        onStart={handlePDFStart}
                        onSuccess={handlePDFSuccess}
                        onError={handlePDFError}
                    />
                    <ActionButton variant="danger" onClick={handleDelete}>
                        <i className="fas fa-trash"></i>
                        Deletar
                    </ActionButton>
                </ActionButtons>
            </Header>

            {/* Container específico para o PDF */}
            <PDFContainer ref={pdfRef}>
                {/* Cabeçalho do PDF (só aparece no PDF) */}
                <div style={{
                    display: 'none',
                    '@media print': { display: 'block' },
                    textAlign: 'center',
                    marginBottom: '30px',
                    paddingBottom: '20px',
                    borderBottom: '2px solid #3498db'
                }}>
                    <h1 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>
                        Fatura #{fatura.id}
                    </h1>
                    <p style={{ color: '#7f8c8d', margin: 0 }}>
                        Gerado em {new Date().toLocaleString('pt-PT')}
                    </p>
                </div>

                {/* Informações Gerais da Fatura */}
                <Card>
                    <CardHeader>
                        <h2>
                            <i className="fas fa-file-invoice-dollar"></i>
                            Informações da Fatura
                        </h2>
                    </CardHeader>

                    <InfoGrid>
                        <InfoItem>
                            <label>ID da Fatura</label>
                            <span>#{fatura.id}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Status</label>
                            <StatusBadge className={getStatusBadgeClass(fatura.status)}>
                                {fatura.status?.nome || 'N/A'}
                            </StatusBadge>
                        </InfoItem>
                        <InfoItem>
                            <label>Data de Emissão</label>
                            <span>{formatDate(fatura.createdAt)}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Valor Total</label>
                            <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#27ae60' }}>
                                {formatCurrency(fatura.valor_total)}
                            </span>
                        </InfoItem>
                    </InfoGrid>
                </Card>

                {/* Informações da Consulta */}
                <Card>
                    <CardHeader>
                        <h2>
                            <i className="fas fa-calendar-check"></i>
                            Informações da Consulta
                        </h2>
                    </CardHeader>

                    <InfoGrid>
                        <InfoItem>
                            <label>ID da Consulta</label>
                            <span>#{fatura.consulta?.id}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Data da Consulta</label>
                            <span>{formatDateTime(fatura.consulta?.data_hora)}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Status da Consulta</label>
                            <StatusBadge className={getStatusBadgeClass(fatura.consulta?.status)}>
                                {fatura.consulta?.status?.nome || 'N/A'}
                            </StatusBadge>
                        </InfoItem>
                    </InfoGrid>
                </Card>

                {/* Informações do Cliente e Médico */}
                <Card>
                    <CardHeader>
                        <h2>
                            <i className="fas fa-users"></i>
                            Cliente e Médico
                        </h2>
                    </CardHeader>

                    <InfoGrid>
                        <InfoItem>
                            <label>Cliente</label>
                            <span>{fatura.consulta?.utilizador?.nome || 'N/A'}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Email do Cliente</label>
                            <span>{fatura.consulta?.utilizador?.email || 'N/A'}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Médico</label>
                            <span>{fatura.consulta?.medico?.nome || 'N/A'}</span>
                        </InfoItem>
                        <InfoItem>
                            <label>Email do Médico</label>
                            <span>{fatura.consulta?.medico?.email || 'N/A'}</span>
                        </InfoItem>
                    </InfoGrid>
                </Card>

                {/* Serviços */}
                <Card>
                    <CardHeader>
                        <h2>
                            <i className="fas fa-list-ul"></i>
                            Serviços Prestados
                        </h2>
                    </CardHeader>

                    {fatura.servicos && fatura.servicos.length > 0 ? (
                        <>
                            <ServicesTable>
                                <thead>
                                    <tr>
                                        <th>Serviço</th>
                                        <th>Descrição</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unitário</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fatura.servicos.map((servico, index) => (
                                        <tr key={index}>
                                            <td style={{ fontWeight: '600' }}>{servico.nome}</td>
                                            <td>{servico.descricao || 'Sem descrição'}</td>
                                            <td>{servico.FaturaServico?.quantidade || 1}</td>
                                            <td>{formatCurrency(servico.FaturaServico?.preco_unitario)}</td>
                                            <td style={{ fontWeight: '600' }}>
                                                {formatCurrency(servico.FaturaServico?.subtotal)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </ServicesTable>

                            <TotalSection>
                                <div className="total-row">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="total-row final-total">
                                    <span>Total:</span>
                                    <span>{formatCurrency(fatura.valor_total)}</span>
                                </div>
                            </TotalSection>
                        </>
                    ) : (
                        <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px' }}>
                            Nenhum serviço encontrado para esta fatura.
                        </p>
                    )}
                </Card>

                {/* Observações */}
                {fatura.observacoes && (
                    <Card>
                        <ObservationsSection>
                            <h4>
                                <i className="fas fa-sticky-note"></i>
                                Observações
                            </h4>
                            <p>{fatura.observacoes}</p>
                        </ObservationsSection>
                    </Card>
                )}
            </PDFContainer>
        </Container>
    );
};

export default FaturaDetalhesPage;