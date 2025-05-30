import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import ServicoItem from './ServicoItem';

function CriarFaturaDialog({ 
  open, 
  onClose, 
  consulta, 
  servicosDisponiveis, 
  onCriar 
}) {
  const [faturaData, setFaturaData] = useState({
    observacoes: '',
    servicos: [{ servico_id: '', quantidade: 1, preco_unitario: 0 }]
  });

  useEffect(() => {
    if (consulta && open) {
      setFaturaData({
        observacoes: `Consulta realizada em ${new Date(consulta.data_hora).toLocaleDateString('pt-PT')}`,
        servicos: [{ servico_id: '', quantidade: 1, preco_unitario: 0 }]
      });
    }
  }, [consulta, open]);

  const calcularTotal = () => {
    return faturaData.servicos.reduce((acc, servico) => {
      const qtd = parseFloat(servico.quantidade) || 0;
      const preco = parseFloat(servico.preco_unitario) || 0;
      return acc + (qtd * preco);
    }, 0).toFixed(2);
  };

  const handleServicoChange = (index, campo, valor) => {
    const servicos = [...faturaData.servicos];

    if (campo === 'servico_id') {
      servicos[index][campo] = valor;
      const servicoSelecionado = servicosDisponiveis.find(s => s.id === parseInt(valor, 10));
      servicos[index].preco_unitario = servicoSelecionado ? servicoSelecionado.preco : 0;
    } else {
      servicos[index][campo] = valor;
    }

    setFaturaData({ ...faturaData, servicos });
  };

  const adicionarServico = () => {
    setFaturaData({
      ...faturaData,
      servicos: [...faturaData.servicos, { servico_id: '', quantidade: 1, preco_unitario: 0 }]
    });
  };

  const removerServico = (index) => {
    const servicos = [...faturaData.servicos];
    servicos.splice(index, 1);
    setFaturaData({ ...faturaData, servicos });
  };

  const handleClose = () => {
    setFaturaData({ 
      observacoes: '', 
      servicos: [{ servico_id: '', quantidade: 1, preco_unitario: 0 }] 
    });
    onClose();
  };

  const handleCriar = () => {
    onCriar(faturaData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Criar Fatura</DialogTitle>
      <DialogContent>
        <TextField
          label="Observações"
          fullWidth
          multiline
          rows={2}
          margin="normal"
          value={faturaData.observacoes}
          onChange={(e) => setFaturaData({ ...faturaData, observacoes: e.target.value })}
        />

        {faturaData.servicos.map((servico, index) => (
          <ServicoItem
            key={index}
            servico={servico}
            index={index}
            servicosDisponiveis={servicosDisponiveis}
            onChange={handleServicoChange}
            onRemove={removerServico}
            showRemove={faturaData.servicos.length > 1}
          />
        ))}

        <Button
          startIcon={<AddCircle />}
          onClick={adicionarServico}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Adicionar Serviço
        </Button>

        <Typography variant="h6">
          Valor Total: R$ {calcularTotal()}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleCriar}
          variant="contained"
          color="primary"
        >
          Criar Fatura
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CriarFaturaDialog;