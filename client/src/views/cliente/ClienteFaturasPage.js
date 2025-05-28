import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';
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
  
  @media print {
    border: 1px solid #ddd;
    margin-bottom: 30px;
    page-break-inside: avoid;
  }
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
    border: 1px solid #ffa000;
  }
  
  &.paga {
    background-color: #e8f5e9;
    color: #388e3c;
    border: 1px solid #388e3c;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
    border: 1px solid #d32f2f;
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
  
  @media print {
    display: none;
  }
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#f39c12' : props.generating ? '#7f8c8d' : '#3498db'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: ${props => props.generating ? 'not-allowed' : 'pointer'};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props =>
    props.generating ? '#7f8c8d' :
      props.secondary ? '#d35400' : '#2980b9'
  };
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

// Componente específico para PDF de uma fatura
const PDFFaturaContainer = styled.div`
  background: white;
  padding: 20px;
  font-family: Arial, sans-serif;
  
  .pdf-header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #3498db;
    
    h1 {
      color: #2c3e50;
      margin: 0 0 10px 0;
      font-size: 1.8rem;
    }
    
    p {
      color: #7f8c8d;
      margin: 0;
    }
  }
  
  .pdf-section {
    margin-bottom: 25px;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    overflow: hidden;
    
    .section-header {
      background-color: #f9f9f9;
      padding: 15px;
      border-bottom: 1px solid #ecf0f1;
      
      h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.2rem;
      }
    }
    
    .section-content {
      padding: 15px;
    }
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    
    .info-item {
      .label {
        font-weight: 600;
        color: #7f8c8d;
        font-size: 0.9rem;
        margin-bottom: 5px;
        text-transform: uppercase;
      }
      
      .value {
        color: #2c3e50;
        font-size: 1rem;
      }
    }
  }
  
  .services-list {
    .service-item {
      padding: 10px;
      border-bottom: 1px solid #ecf0f1;
      
      &:last-child {
        border-bottom: none;
      }
      
      .service-name {
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 5px;
      }
      
      .service-details {
        font-size: 0.9rem;
        color: #7f8c8d;
      }
    }
  }
  
  .total-section {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    text-align: right;
    margin-top: 20px;
    
    .total-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #27ae60;
    }
  }
`;

function ClienteFaturasPage() {
  const [faturas, setFaturas] = useState([]);
  const [activeTab, setActiveTab] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState({});
  const pdfRefs = useRef({});

  useEffect(() => {
    carregarFaturas();
  }, []);

  const carregarFaturas = async () => {
    try {
      setLoading(true);
      const response = await FaturaService.getFaturasByCliente();
      setFaturas(response.faturas || []);
    } catch (error) {
      toast.error('Não foi possível carregar suas faturas');
    } finally {
      setLoading(false);
    }
  };

const confirmarPagamento = async (faturaId) => {
  try {
    
    const statusPagaId = 2;

    await FaturaService.atualizarStatusFatura(faturaId, statusPagaId);
    toast.success('Pagamento confirmado com sucesso!');

    setFaturas(prevFaturas =>
      prevFaturas.map(fat =>
        fat.id === faturaId ? { ...fat, status: { nome: 'paga' } } : fat
      )
    );
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    toast.error('Não foi possível confirmar o pagamento');
  }
};;

  const gerarPDFFatura = async (fatura) => {
    if (!fatura) {
      toast.error('Dados da fatura não encontrados');
      return;
    }

    try {
      setGeneratingPDF(prev => ({ ...prev, [fatura.id]: true }));

      // Criar elemento temporário para o PDF
      const pdfElement = document.createElement('div');
      pdfElement.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: white;">
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3498db;">
            <h1 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.8rem;">Fatura #${fatura.id}</h1>
            <p style="color: #7f8c8d; margin: 0;">Gerado em ${new Date().toLocaleString('pt-PT')}</p>
          </div>

          <div style="margin-bottom: 25px; border: 1px solid #ecf0f1; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f9f9f9; padding: 15px; border-bottom: 1px solid #ecf0f1;">
              <h3 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">Informações da Fatura</h3>
            </div>
            <div style="padding: 15px;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div>
                  <div style="font-weight: 600; color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">ID da Fatura</div>
                  <div style="color: #2c3e50; font-size: 1rem;">#${fatura.id}</div>
                </div>
                <div>
                  <div style="font-weight: 600; color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">Status</div>
                  <div style="color: #2c3e50; font-size: 1rem;">${fatura.status?.nome || 'N/A'}</div>
                </div>
                <div>
                  <div style="font-weight: 600; color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">Data de Emissão</div>
                  <div style="color: #2c3e50; font-size: 1rem;">${formatarData(fatura.createdAt)}</div>
                </div>
                <div>
                  <div style="font-weight: 600; color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">Valor Total</div>
                  <div style="color: #27ae60; font-size: 1.3rem; font-weight: 700;">${formatarValor(fatura.valor_total)}</div>
                </div>
              </div>
            </div>
          </div>

          ${fatura.consulta ? `
          <div style="margin-bottom: 25px; border: 1px solid #ecf0f1; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f9f9f9; padding: 15px; border-bottom: 1px solid #ecf0f1;">
              <h3 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">Informações da Consulta</h3>
            </div>
            <div style="padding: 15px;">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div>
                  <div style="font-weight: 600; color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">Data da Consulta</div>
                  <div style="color: #2c3e50; font-size: 1rem;">${formatarData(fatura.consulta.data_hora)} às ${new Date(fatura.consulta.data_hora).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div>
                  <div style="font-weight: 600; color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase;">Médico</div>
                  <div style="color: #2c3e50; font-size: 1rem;">${fatura.consulta.medico?.nome || 'Não informado'}</div>
                </div>
              </div>
            </div>
          </div>
          ` : ''}

          ${fatura.servicos && fatura.servicos.length > 0 ? `
          <div style="margin-bottom: 25px; border: 1px solid #ecf0f1; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f9f9f9; padding: 15px; border-bottom: 1px solid #ecf0f1;">
              <h3 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">Serviços Prestados</h3>
            </div>
            <div style="padding: 15px;">
              ${fatura.servicos.map(servico => `
                <div style="padding: 10px; border-bottom: 1px solid #ecf0f1;">
                  <div style="font-weight: 600; color: #2c3e50; margin-bottom: 5px;">${servico.nome}</div>
                  <div style="font-size: 0.9rem; color: #7f8c8d;">
                    ${servico.FaturaServico.quantidade}x ${parseFloat(servico.FaturaServico.preco_unitario).toFixed(2)}€ = <strong>${parseFloat(servico.FaturaServico.subtotal).toFixed(2)}€</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          ${fatura.observacoes ? `
          <div style="margin-bottom: 25px; border: 1px solid #ecf0f1; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f9f9f9; padding: 15px; border-bottom: 1px solid #ecf0f1;">
              <h3 style="margin: 0; color: #2c3e50; font-size: 1.2rem;">Observações</h3>
            </div>
            <div style="padding: 15px;">
              <p style="margin: 0; color: #5d6d7e; line-height: 1.6;">${fatura.observacoes}</p>
            </div>
          </div>
          ` : ''}

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; text-align: right; margin-top: 20px;">
            <div style="font-size: 1.5rem; font-weight: 700; color: #27ae60;">
              Total: ${formatarValor(fatura.valor_total)}
            </div>
          </div>
        </div>
      `;

      // Configurações do PDF
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `fatura-${fatura.id}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy']
        }
      };

      console.log('Iniciando geração do PDF...');

      await html2pdf()
        .set(opt)
        .from(pdfElement)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          console.log('PDF gerado com sucesso');
          toast.success('PDF gerado com sucesso!');
        })
        .save()
        .catch((error) => {
          console.error('Erro na geração do PDF:', error);
          throw error;
        });

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setGeneratingPDF(prev => ({ ...prev, [fatura.id]: false }));
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
    switch (status) {
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
                    {fatura.consulta
                      ? `${formatarData(fatura.consulta.data_hora)} às ${new Date(fatura.consulta.data_hora).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}`
                      : 'N/A'}
                  </span>
                </FaturaDetail>

                <FaturaDetail>
                  <span className="label">Médico:</span>
                  <span className="value">
                    {fatura.consulta?.medico?.nome || 'Não informado'}
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

                {fatura.servicos && fatura.servicos.length > 0 && (
                  <FaturaDetail style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="label" style={{ marginBottom: '0.5rem' }}>Serviços:</span>
                    {fatura.servicos.map((servico) => (
                      <div key={servico.id} style={{ paddingLeft: '1rem', marginBottom: '0.25rem' }}>
                        <div><strong>{servico.nome}</strong></div>
                        <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                          {servico.FaturaServico.quantidade}x {parseFloat(servico.FaturaServico.preco_unitario).toFixed(2)}€ = <strong>{parseFloat(servico.FaturaServico.subtotal).toFixed(2)}€</strong>
                        </div>
                      </div>
                    ))}
                  </FaturaDetail>
                )}
              </FaturaBody>

              <FaturaActions>
                <Button
                  onClick={() => gerarPDFFatura(fatura)}
                  disabled={generatingPDF[fatura.id]}
                  generating={generatingPDF[fatura.id]}
                >
                  <i className="fas fa-file-pdf"></i> Gerar PDF
                </Button>

                {fatura.status?.nome.toLowerCase() === 'emitida' && (
                  <Button
                    secondary
                    onClick={() => confirmarPagamento(fatura.id)}
                  >
                    <i className="fas fa-credit-card"></i> Pagar
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