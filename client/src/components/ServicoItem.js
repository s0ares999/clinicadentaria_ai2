import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';

function ServicoItem({ 
  servico, 
  index, 
  servicosDisponiveis, 
  onChange, 
  onRemove,
  showRemove = true 
}) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
      <TextField
        select
        label="Serviço"
        value={servico.servico_id}
        onChange={(e) => onChange(index, 'servico_id', e.target.value)}
        sx={{ width: '40%' }}
        SelectProps={{
          native: true
        }}
      >
        <option value="">Selecione um serviço</option>
        {servicosDisponiveis.map(s => (
          <option key={s.id} value={s.id}>
            {s.nome}
          </option>
        ))}
      </TextField>

      <TextField
        label="Quantidade"
        type="number"
        value={servico.quantidade}
        onChange={(e) => onChange(index, 'quantidade', e.target.value)}
        sx={{ width: '20%' }}
        inputProps={{ min: 1 }}
      />

      <TextField
        label="Preço Unitário"
        type="number"
        value={servico.preco_unitario}
        onChange={(e) => onChange(index, 'preco_unitario', e.target.value)}
        sx={{ width: '30%' }}
        inputProps={{ min: 0, step: 0.01 }}
        disabled
      />

      {showRemove && (
        <IconButton onClick={() => onRemove(index)} color="error">
          <RemoveCircle />
        </IconButton>
      )}
    </Box>
  );
}

export default ServicoItem;