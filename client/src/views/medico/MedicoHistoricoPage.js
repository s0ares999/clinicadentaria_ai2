import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button
} from '@mui/material';
import { toast } from 'react-hot-toast';
import ConsultaService from '../../services/consulta.service';

function MedicoHistoricoPage() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultasConcluidasMedico();
  }, []);

  const loadConsultasConcluidasMedico = async () => {
    try {
      setLoading(true);
      const consultasResponse = await ConsultaService.getConsultasConcluidas();

      // Para cada consulta, verifica se tem fatura
      const consultasComFatura = await Promise.all(
        (consultasResponse || []).map(async (consulta) => {
          try {
            const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
            return {
              ...consulta,
              tem_fatura: !!fatura?.id
            };
          } catch {
            return { ...consulta, tem_fatura: false };
          }
        })
      );

      setConsultas(consultasComFatura);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar histórico de consultas concluídas:', error);
      toast.error('Erro ao carregar histórico de consultas concluídas');
      setConsultas([]);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Histórico de Consultas Concluídas
      </Typography>

      <Button
        onClick={loadConsultasConcluidasMedico}
        variant="contained"
        sx={{ marginBottom: '1rem' }}
      >
        Atualizar Histórico
      </Button>

      {loading ? (
        <p>Carregando histórico...</p>
      ) : consultas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Nenhuma consulta concluída encontrada.</p>
          <small>Quando você finalizar consultas, elas aparecerão aqui.</small>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data/Hora</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Observações</TableCell>
                <TableCell>Fatura</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultas.map((consulta) => (
                <TableRow key={consulta.id}>
                  <TableCell>{new Date(consulta.data_hora).toLocaleString('pt-PT')}</TableCell>
                  <TableCell>{consulta.utilizador?.nome || 'Paciente não identificado'}</TableCell>
                  <TableCell style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {consulta.observacoes || 'Sem observações'}
                  </TableCell>
                  <TableCell>
                    {consulta.tem_fatura ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>Emitida</span>
                    ) : (
                      <span style={{ color: '#777' }}>Não emitida</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default MedicoHistoricoPage;
