import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

function StatusDialog({ 
  open, 
  onClose, 
  consulta, 
  onUpdate 
}) {
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (consulta) {
      setSelectedStatus(consulta.status?.nome || '');
    }
  }, [consulta]);

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = () => {
    onUpdate(selectedStatus);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Alterar Status da Consulta</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          fullWidth
          SelectProps={{
            native: true
          }}
        >
          <option value="Pendente">Pendente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Concluída">Concluída</option>
          <option value="Cancelada">Cancelada</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatusDialog;