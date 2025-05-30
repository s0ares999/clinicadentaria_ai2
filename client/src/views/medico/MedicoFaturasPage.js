import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import FaturaService from '../../services/fatura.service';
import ConsultaService from '../../services/consulta.service';
import MedicoFaturasListagemComponent from './MedicoFaturasListagemComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

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
  border-bottom: 1px solid #ecf0f1;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${props => props.active ? '#3498db' : '#7f8c8d'};
  border: none;
  border-bottom: ${props => props.active ? '2px solid #3498db' : 'none'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 1rem;
    color: #34495e;
    font-weight: 600;
    background-color: #f8f9fa;
  }
  
  td {
    padding: 1rem;
    border-top: 1px solid #ecf0f1;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 0.75rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#f39c12' : props.danger ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${props => props.secondary ? '#d35400' : props.danger ? '#c0392b' : '#2980b9'};
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

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const DialogTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;

const DebugInfo = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: monospace;
  font-size: 0.8rem;
`;

function MedicoFaturasPage() {
  const [faturas, setFaturas] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('todas');
  const [showModal, setShowModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [formData, setFormData] = useState({
    valor_total: '',
    observacoes: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    setDebugInfo('Iniciando carregamento dos dados...');
    
    try {
      console.log('🔍 Iniciando busca de faturas e consultas...');
      
      // Buscar faturas do médico
      setDebugInfo(prev => prev + '\nBuscando faturas do médico...');
      let faturasResponse = [];
      try {
        faturasResponse = await FaturaService.getFaturasByMedico();
        console.log('✅ Faturas encontradas:', faturasResponse);
        setDebugInfo(prev => prev + `\n✅ ${faturasResponse?.length || 0} faturas encontradas`);
      } catch (faturaError) {
        console.error('❌ Erro ao buscar faturas:', faturaError);
        setDebugInfo(prev => prev + `\n❌ Erro ao buscar faturas: ${faturaError.message}`);
        // Continuar mesmo se der erro nas faturas
      }

      // Buscar consultas do médico
      setDebugInfo(prev => prev + '\nBuscando consultas do médico...');
      let consultasResponse = [];
      try {
        consultasResponse = await ConsultaService.getConsultasMedico();
        console.log('✅ Consultas encontradas:', consultasResponse);
        setDebugInfo(prev => prev + `\n✅ ${consultasResponse?.length || 0} consultas encontradas`);
      } catch (consultaError) {
        console.error('❌ Erro ao buscar consultas:', consultaError);
        setDebugInfo(prev => prev + `\n❌ Erro ao buscar consultas: ${consultaError.message}`);
      }

      setFaturas(faturasResponse || []);

      // Mapear IDs das consultas que já têm faturas
      const consultasComFaturaIds = new Set(
        (faturasResponse || []).map(fatura => fatura.consulta_id)
      );

      console.log('📝 Consultas com fatura (IDs):', Array.from(consultasComFaturaIds));

      // Adiciona flag indicando se consulta já tem fatura
      const consultasComFlagFatura = (consultasResponse || []).map(consulta => ({
        ...consulta,
        tem_fatura: consultasComFaturaIds.has(consulta.id)
      }));

      // Filtrar consultas concluídas que não têm fatura
      const consultasSemFatura = consultasComFlagFatura.filter(
        consulta => !consulta.tem_fatura && consulta.status?.nome === 'Concluída'
      );

      console.log('🔍 Consultas sem fatura:', consultasSemFatura);
      setDebugInfo(prev => prev + `\n📋 ${consultasSemFatura?.length || 0} consultas sem fatura`);

      setConsultas(consultasSemFatura);

    } catch (error) {
      console.error("❌ Erro geral ao carregar dados:", error);
      setDebugInfo(prev => prev + `\n❌ Erro geral: ${error.message}`);
      toast.error("Não foi possível carregar os dados");
    } finally {
      setLoading(false);
      setDebugInfo(prev => prev + '\n🏁 Carregamento finalizado');
    }
  };

  const handleCriarFatura = (consulta) => {
    setConsultaSelecionada(consulta);
    setFormData({
      valor_total: '50.00', // Valor padrão
      observacoes: `Consulta realizada em ${formatarData(consulta.data_hora)}`
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valorTotal;
    try {
      valorTotal = parseFloat(formData.valor_total);
      if (isNaN(valorTotal) || valorTotal <= 0) {
        toast.error("O valor da fatura deve ser maior que zero");
        return;
      }
    } catch (error) {
      toast.error("O valor informado é inválido");
      return;
    }

    try {
      await FaturaService.criarFatura({
        consulta_id: consultaSelecionada.id,
        valor_total: valorTotal,
        observacoes: formData.observacoes,
        status_id: 1
      });

      toast.success("Fatura criada com sucesso");
      setShowModal(false);
      carregarDados();
    } catch (error) {
      console.error("Erro ao criar fatura:", error);
      let mensagemErro = "Erro ao criar fatura";
      if (error.response && error.response.data) {
        mensagemErro = error.response.data.message || mensagemErro;
      }
      toast.error(mensagemErro);
    }
  };

  const formatarData = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT');
  };

  const formatarValor = (valor) => {
    return `${parseFloat(valor).toFixed(2)} €`;
  };

  const getStatusClass = (status) => {
    if (!status) return '';

    switch (status.nome?.toLowerCase()) {
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
    if (activeTab === 'todas') {
      return faturas;
    }
    return faturas.filter(fatura => fatura.status?.nome.toLowerCase() === activeTab);
  };

  return (
    <Container>
      <FaturasContainer>
        <SectionTitle>
          Gestão de Faturas
          <Button onClick={carregarDados}>
            <i className="fas fa-sync"></i> Atualizar
          </Button>
        </SectionTitle>

        {/* Debug Info - remova em produção */}
        <DebugInfo>
          <strong>Debug Info:</strong>
          <pre>{debugInfo}</pre>
        </DebugInfo>

        <TabsContainer>
          <Tab active={activeTab === 'todas'} onClick={() => setActiveTab('todas')}>
            Todas ({faturas.length})
          </Tab>
          <Tab active={activeTab === 'emitida'} onClick={() => setActiveTab('emitida')}>
            Pendentes ({faturas.filter(f => f.status?.nome.toLowerCase() === 'emitida').length})
          </Tab>
          <Tab active={activeTab === 'paga'} onClick={() => setActiveTab('paga')}>
            Pagas ({faturas.filter(f => f.status?.nome.toLowerCase() === 'paga').length})
          </Tab>
          <Tab active={activeTab === 'cancelada'} onClick={() => setActiveTab('cancelada')}>
            Canceladas ({faturas.filter(f => f.status?.nome.toLowerCase() === 'cancelada').length})
          </Tab>
        </TabsContainer>

        {loading ? (
          <EmptyState>Carregando faturas...</EmptyState>
        ) : faturas.length > 0 ? (
          <MedicoFaturasListagemComponent
            faturas={filtrarFaturas()}
            recarregarDados={carregarDados}
          />
        ) : (
          <EmptyState>
            Nenhuma fatura encontrada.
          </EmptyState>
        )}

        {activeTab === 'todas' && (
          <>
            <SectionTitle style={{ marginTop: '2rem' }}>
              Consultas Concluídas sem Fatura ({consultas.length})
            </SectionTitle>

            {consultas.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Data</th>
                      <th>Paciente</th>
                      <th>Status</th>
                      <th>Observações</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultas.map(consulta => (
                      <tr key={consulta.id}>
                        <td>#{consulta.id}</td>
                        <td>{formatarData(consulta.data_hora)}</td>
                        <td>{consulta.utilizador?.nome || 'Paciente'}</td>
                        <td>
                          <StatusBadge className={getStatusClass(consulta.status)}>
                            {consulta.status?.nome || 'Indefinido'}
                          </StatusBadge>
                        </td>
                        <td>{consulta.observacoes || '-'}</td>
                        <td>
                          <Button onClick={() => handleCriarFatura(consulta)}>
                            Criar Fatura
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <EmptyState>
                Não há consultas concluídas sem fatura.
              </EmptyState>
            )}
          </>
        )}
      </FaturasContainer>

      {/* Modal para criar fatura */}
      {showModal && (
        <Dialog>
          <DialogContent>
            <DialogTitle>Criar Fatura</DialogTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Consulta</label>
                <input
                  type="text"
                  value={`#${consultaSelecionada?.id} - ${consultaSelecionada?.utilizador?.nome || 'Paciente'}`}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <label>Valor Total (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor_total}
                  onChange={e => setFormData({ ...formData, valor_total: e.target.value })}
                  required
                  min="0.01"
                />
              </FormGroup>
              <FormGroup>
                <label>Observações</label>
                <textarea
                  rows={3}
                  value={formData.observacoes}
                  onChange={e => setFormData({ ...formData, observacoes: e.target.value })}
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="submit">Criar</Button>
                <Button
                  type="button"
                  secondary
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
              </ButtonGroup>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}

export default MedicoFaturasPage;