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
import MedicoService from '../../services/medico.service';
import FaturaService from '../../services/fatura.service';
import api from '../../services/api.config';

function MedicoHistoricoPage() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultasConcluidas();
  }, []);

  const loadConsultasConcluidas = async () => {
    try {
      setLoading(true);
      console.log("Carregando histórico de consultas concluídas...");
      
      const response = await MedicoService.getConsultasConcluidas();
      console.log("Consultas concluídas carregadas:", response);
      
      setConsultas(response || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar histórico de consultas:', error);
      toast.error('Erro ao carregar histórico de consultas');
      setConsultas([]);
      setLoading(false);
    }
  };

  const handleViewFatura = async (consulta) => {
    try {
      // Obter a fatura associada à consulta
      const response = await api.get(`http://localhost:8000/api/consulta/${consulta.id}/fatura`);
      if (response.data && response.data.id) {
        // Abrir o PDF em uma nova aba
        const pdfUrl = FaturaService.getPDFUrl(response.data.id);
        window.open(pdfUrl, '_blank');
      } else {
        toast.error('Não foi possível localizar a fatura desta consulta');
      }
    } catch (error) {
      console.error('Erro ao buscar fatura:', error);
      toast.error('Erro ao buscar informações da fatura');
    }
  };

  const handleCriarFatura = (consulta) => {
    // Redirecionar para a página de faturas
    window.location.href = '/medico-dashboard/faturas';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Histórico de Consultas Concluídas
      </Typography>
      
      <button 
        onClick={() => loadConsultasConcluidas()} 
        style={{padding: '0.5rem 1rem', margin: '1rem 0'}}>
        Atualizar Histórico
      </button>

      {loading ? (
        <p>Carregando histórico...</p>
      ) : consultas.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
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
                      <Button
                        color="success"
                        variant="outlined"
                        onClick={() => handleViewFatura(consulta)}
                      >
                        Ver Fatura
                      </Button>
                    ) : (
                      <Button
                        color="warning"
                        variant="contained"
                        onClick={() => handleCriarFatura(consulta)}
                      >
                        Criar Fatura
                      </Button>
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