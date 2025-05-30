import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

function FinalizarConsultaDialog({ 
  open, 
  onClose, 
  consulta, 
  onConfirm 
}) {
  const [observacoes, setObservacoes] = useState('');

  const handleClose = () => {
    setObservacoes('');
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(observacoes);
    setObservacoes('');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Finalizar Consulta</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Observações"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          margin="normal"
          placeholder="Digite suas observações sobre a consulta..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarConsultaDialog;