import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import FaturaService from '../services/fatura.service';

const Button = styled.button`
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #d35400;
  }
`;

const DialogBackdrop = styled.div`
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
  
  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ecf0f1;
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #7f8c8d;
  border: 1px solid #7f8c8d;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #2980b9;
  }
`;

function CriarFaturaButton({ consulta, onFaturaCriada }) {
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState(consulta?.valor || 50);
  const [descricao, setDescricao] = useState(`Consulta do dia ${new Date(consulta?.data_hora).toLocaleDateString('pt-PT')}`);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!valor || valor <= 0) {
      toast.error('O valor da fatura deve ser maior que zero');
      return;
    }
    
    setLoading(true);
    
    try {
      const dadosFatura = {
        valor_total: valor,
        observacoes: descricao,
        status_id: 1 // Status inicial: Emitida
      };
      
      const response = await FaturaService.criarFatura(consulta.id, dadosFatura);
      
      toast.success('Fatura criada com sucesso');
      setOpen(false);
      if (onFaturaCriada) onFaturaCriada(response);
      
    } catch (error) {
      console.error('Erro ao criar fatura:', error);
      toast.error('Não foi possível criar a fatura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <i className="fas fa-file-invoice"></i> Criar Fatura
      </Button>
      
      {open && (
        <DialogBackdrop>
          <DialogContent>
            <DialogTitle>Criar Nova Fatura</DialogTitle>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Consulta</label>
                <input 
                  type="text" 
                  value={`Consulta #${consulta.id}`} 
                  disabled 
                />
              </FormGroup>
              
              <FormGroup>
                <label>Valor (€)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={valor}
                  onChange={(e) => setValor(parseFloat(e.target.value))}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Descrição</label>
                <textarea 
                  rows="3"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </FormGroup>
              
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setOpen(false)}>
                  Cancelar
                </CancelButton>
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Processando...' : 'Emitir Fatura'}
                </SubmitButton>
              </ButtonGroup>
            </form>
          </DialogContent>
        </DialogBackdrop>
      )}
    </>
  );
}

export default CriarFaturaButton; 