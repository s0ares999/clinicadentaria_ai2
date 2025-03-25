import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import FaturaService from '../../services/fatura.service';

// Componentes estilizados
const Container = styled.div`
  margin: 1rem 0;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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

function MedicoFaturasListagemComponent({ faturas, recarregarDados }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [faturaSelecionada, setFaturaSelecionada] = useState(null);
  const [formData, setFormData] = useState({
    valor_total: '',
    observacoes: ''
  });
  
  const handleOpenEditModal = (fatura) => {
    console.log("Abrindo modal de edição para fatura:", fatura);
    setFaturaSelecionada(fatura);
    setFormData({
      valor_total: fatura.valor_total.toString(),
      observacoes: fatura.observacoes || ''
    });
    setShowEditModal(true);
  };
  
  const handleUpdateFatura = async (e) => {
    e.preventDefault();
    
    if (!formData.valor_total || parseFloat(formData.valor_total) <= 0) {
      toast.error("O valor da fatura deve ser maior que zero");
      return;
    }
    
    try {
      await FaturaService.editarFatura(faturaSelecionada.id, {
        valor_total: parseFloat(formData.valor_total),
        observacoes: formData.observacoes
      });
      
      toast.success("Fatura atualizada com sucesso");
      setShowEditModal(false);
      if (recarregarDados) recarregarDados();
      
    } catch (error) {
      console.error("Erro ao atualizar fatura:", error);
      toast.error("Erro ao atualizar fatura");
    }
  };
  
  const handleUpdateStatus = async (faturaId, newStatusId) => {
    try {
      await FaturaService.atualizarStatusFatura(faturaId, newStatusId);
      toast.success("Status da fatura atualizado com sucesso");
      if (recarregarDados) recarregarDados();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status da fatura");
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
    
    console.log("Status da fatura:", status);
    
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
  
  return (
    <Container>
      {faturas.length > 0 ? (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Paciente</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {faturas.map(fatura => (
                <tr key={fatura.id}>
                  <td>#{fatura.id}</td>
                  <td>{formatarData(fatura.createdAt)}</td>
                  <td>{fatura.consulta?.utilizador?.nome || 'Paciente'}</td>
                  <td>{formatarValor(fatura.valor_total)}</td>
                  <td>
                    <StatusBadge className={getStatusClass(fatura.status)}>
                      {fatura.status?.nome || 'Desconhecido'}
                    </StatusBadge>
                  </td>
                  <td>
                    <ButtonGroup>
                      {fatura.status && ['emitida', 'Emitida', 'EMITIDA'].includes(fatura.status.nome) && (
                        <>
                          <Button 
                            onClick={() => handleUpdateStatus(fatura.id, 2)} 
                            secondary
                          >
                            Marcar Paga
                          </Button>
                          <Button 
                            onClick={() => handleOpenEditModal(fatura)} 
                            style={{ backgroundColor: '#3498db', marginLeft: '0.5rem' }}
                          >
                            Editar
                          </Button>
                          <Button 
                            onClick={() => handleUpdateStatus(fatura.id, 3)} 
                            danger
                            style={{ marginLeft: '0.5rem' }}
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {/* Exibir o status da fatura para fins de depuração */}
                      {!['emitida', 'Emitida', 'EMITIDA'].includes(fatura.status?.nome) && (
                        <span style={{ color: "#666", fontSize: "0.8rem" }}>
                          Status: {fatura.status?.nome} (ID: {fatura.status?.id})
                        </span>
                      )}
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState>
          Nenhuma fatura encontrada.
        </EmptyState>
      )}
      
      {/* Modal para editar fatura */}
      {showEditModal && (
        <Dialog>
          <DialogContent>
            <DialogTitle>Editar Fatura</DialogTitle>
            <form onSubmit={handleUpdateFatura}>
              <FormGroup>
                <label>Valor (€) *</label>
                <input 
                  type="number"
                  step="0.01"
                  value={formData.valor_total}
                  onChange={e => setFormData({...formData, valor_total: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Observações</label>
                <textarea 
                  rows="3"
                  value={formData.observacoes}
                  onChange={e => setFormData({...formData, observacoes: e.target.value})}
                ></textarea>
              </FormGroup>
              
              <ButtonGroup style={{ justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <Button 
                  type="button" 
                  onClick={() => setShowEditModal(false)} 
                  style={{ backgroundColor: '#7f8c8d' }}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Atualizar Fatura
                </Button>
              </ButtonGroup>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}

export default MedicoFaturasListagemComponent; 