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
import ConsultaService from '../../services/consulta.service';
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
      console.log("Buscando fatura para consulta ID:", consulta.id);
      
      // Usar o serviço de consulta para buscar a fatura
      const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
      console.log("Fatura encontrada:", fatura);
      
      if (fatura && fatura.id) {
        // Obter URL do PDF e abrir em nova aba
        const pdfUrl = FaturaService.getPDFUrl(fatura.id);
        console.log("URL do PDF:", pdfUrl);
        window.open(pdfUrl, '_blank');
      } else {
        toast.error('Não foi possível localizar a fatura desta consulta');
      }
    } catch (error) {
      console.error('Erro ao buscar fatura:', error);
      toast.error('Erro ao buscar informações da fatura');
    }
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
                      <span style={{ color: '#777' }}>Sem fatura</span>
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