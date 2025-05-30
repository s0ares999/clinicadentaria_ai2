import React from 'react';
import { TableRow, TableCell, Button, Typography } from '@mui/material';

function ConsultaTableRow({ 
  consulta, 
  onAprovar, 
  onRecusar, 
  onFinalizar, 
  onCriarFatura, 
  onEditarStatus 
}) {
  const renderAcoes = () => {
    const status = consulta.status?.nome;

    if (status === 'Pendente') {
      return (
        <>
          <Button
            color="primary"
            size="small"
            onClick={() => onAprovar(consulta.id)}
            sx={{ mr: 1 }}
          >
            Aprovar
          </Button>
          <Button
            color="error"
            size="small"
            onClick={() => onRecusar(consulta.id)}
          >
            Recusar
          </Button>
        </>
      );
    }

    if (status === 'Confirmada') {
      return (
        <Button
          color="success"
          size="small"
          onClick={() => onFinalizar(consulta)}
        >
          Finalizar
        </Button>
      );
    }

    if (status === 'Concluída') {
      if (!consulta.tem_fatura) {
        return (
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={() => onCriarFatura(consulta)}
          >
            Criar Fatura
          </Button>
        );
      } else {
        return (
          <Typography
            variant="body2"
            color="success.main"
            sx={{ fontWeight: 'bold', display: 'inline-block', mr: 1 }}
          >
            Fatura já emitida
          </Typography>
        );
      }
    }

    // Para status que não são 'Concluída' nem 'Cancelada', mostrar botão de editar status
    if (status !== 'Cancelada') {
      return (
        <Button
          color="info"
          size="small"
          onClick={() => onEditarStatus(consulta)}
        >
          Editar Status
        </Button>
      );
    }

    return null;
  };

  return (
    <TableRow>
      <TableCell>
        {new Date(consulta.data_hora).toLocaleString('pt-PT')}
      </TableCell>
      <TableCell>
        {consulta.utilizador?.nome || 'Paciente não identificado'}
      </TableCell>
      <TableCell>
        {consulta.status?.nome || 'Status desconhecido'}
      </TableCell>
      <TableCell>
        {consulta.observacoes || 'Sem observações'}
      </TableCell>
      <TableCell>
        {renderAcoes()}
      </TableCell>
    </TableRow>
  );
}

export default ConsultaTableRow;