import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box
} from '@mui/material';
import { toast } from 'react-hot-toast';
import FaturaService from '../../../services/fatura.service';

function FaturasComponent() {
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    loadFaturas();
  }, []);

  const loadFaturas = async () => {
    try {
      const response = await FaturaService.getFaturasMedico();
      if (response.success) {
        setFaturas(response.data);
      }
    } catch (error) {
      toast.error('Erro ao carregar faturas');
    }
  };

  const handleEmitirFatura = async (consultaId) => {
    try {
      await FaturaService.emitirFatura(consultaId);
      toast.success('Fatura emitida com sucesso!');
      loadFaturas();
    } catch (error) {
      toast.error('Erro ao emitir fatura');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Gestão de Faturas
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faturas.map((fatura) => (
              <TableRow key={fatura.id}>
                <TableCell>{new Date(fatura.data).toLocaleDateString()}</TableCell>
                <TableCell>{fatura.cliente.nome}</TableCell>
                <TableCell>€{fatura.valor}</TableCell>
                <TableCell>{fatura.status}</TableCell>
                <TableCell>
                  {fatura.status === 'PENDENTE' && (
                    <Button
                      color="primary"
                      onClick={() => handleEmitirFatura(fatura.consulta_id)}
                    >
                      Emitir Fatura
                    </Button>
                  )}
                  <Button
                    color="info"
                    onClick={() => window.open(`/api/faturas/${fatura.id}/pdf`, '_blank')}
                  >
                    Ver PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default FaturasComponent; 