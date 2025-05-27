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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { toast } from 'react-hot-toast';
import ConsultaService from '../../../services/consulta.service';
import FaturaService from '../../../services/fatura.service';

function ConsultasComponent() {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [faturaDialogOpen, setFaturaDialogOpen] = useState(false);
  const [faturaData, setFaturaData] = useState({
    valor_total: '',
    observacoes: ''
  });

  const STATUS_IDS = {
    PENDENTE: 1,
    CONFIRMADA: 2,
    CONCLUIDA: 3, 
    CANCELADA: 4
  };

  useEffect(() => {
    loadConsultas();
  }, []);

  useEffect(() => {
    console.log("Consultas atualizadas:", consultas);
  }, [consultas]);

  const loadConsultas = async () => {
    try {
      setLoading(true);
      console.log("Iniciando carregamento de consultas do médico");
      
      // Usando o método correto do service para buscar consultas do médico
      const response = await ConsultaService.getConsultasMedico();
      console.log("Resposta da API para consultas:", response);
      
      if (Array.isArray(response)) {
        setConsultas(response);
        console.log(`Carregadas ${response.length} consultas`);
      } else {
        console.error("A resposta não é um array:", response);
        setConsultas([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erro detalhado ao carregar consultas:', error);
      if (error.response) {
        console.error('Status do erro:', error.response.status);
        console.error('Dados do erro:', error.response.data);
      }
      toast.error('Erro ao carregar consultas');
      setConsultas([]);
      setLoading(false);
    }
  };

  const handleAprovar = async (consultaId) => {
    try {
      await ConsultaService.aceitarConsulta(consultaId);
      toast.success('Consulta aprovada com sucesso!');
      loadConsultas();
    } catch (error) {
      console.error('Erro ao aprovar consulta:', error);
      toast.error('Erro ao aprovar consulta');
    }
  };

  const handleRecusar = async (consultaId) => {
    try {
      await ConsultaService.recusarConsulta(consultaId);
      toast.success('Consulta recusada');
      loadConsultas();
    } catch (error) {
      console.error('Erro ao recusar consulta:', error);
      toast.error('Erro ao recusar consulta');
    }
  };

  const handleFinalizarConsulta = async () => {
    try {
      await ConsultaService.finalizarConsulta(selectedConsulta.id, observacoes);
      toast.success('Consulta finalizada com sucesso!');
      setDialogOpen(false);
      setObservacoes('');
      loadConsultas();
    } catch (error) {
      console.error('Erro ao finalizar consulta:', error);
      toast.error('Erro ao finalizar consulta');
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const statusMap = {
        'Pendente': 1,
        'Confirmada': 2,
        'Concluída': 3,
        'Cancelada': 4
      };
      
      await ConsultaService.updateConsulta(selectedConsulta.id, {
        status_id: statusMap[selectedStatus]
      });
      
      toast.success(`Status da consulta alterado para ${selectedStatus}`);
      setStatusDialogOpen(false);
      loadConsultas();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status da consulta');
    }
  };

  const handleOpenFaturaDialog = (consulta) => {
    setSelectedConsulta(consulta);
    setFaturaData({
      valor_total: '50.00', // Valor padrão
      observacoes: `Consulta realizada em ${new Date(consulta.data_hora).toLocaleDateString('pt-PT')}`
    });
    setFaturaDialogOpen(true);
  };

  const handleCriarFatura = async () => {
    try {
      if (!faturaData.valor_total || parseFloat(faturaData.valor_total) <= 0) {
        toast.error('O valor da fatura deve ser maior que zero');
        return;
      }

      await FaturaService.criarFatura(selectedConsulta.id, {
        valor_total: parseFloat(faturaData.valor_total),
        observacoes: faturaData.observacoes,
        status_id: 1 // 1 = Emitida
      });

      toast.success('Fatura criada com sucesso!');
      setFaturaDialogOpen(false);
      setFaturaData({ valor_total: '', observacoes: '' });
      loadConsultas();
    } catch (error) {
      console.error('Erro ao criar fatura:', error);
      toast.error('Erro ao criar fatura');
    }
  };

  const handleViewFatura = async (consulta) => {
    try {
      // Usando o método do service para buscar a fatura
      const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
      if (fatura && fatura.id) {
        // Abrir o PDF em uma nova aba
        const pdfUrl = FaturaService.getPDFUrl(fatura.id);
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
        Gestão de Consultas
      </Typography>
      
      <Button 
        onClick={() => loadConsultas()} 
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Recarregar Consultas
      </Button>

      {loading ? (
        <Typography>Carregando consultas...</Typography>
      ) : consultas.length === 0 ? (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography>Nenhuma consulta encontrada.</Typography>
          <Typography variant="caption" color="text.secondary">
            Se isso parecer incorreto, verifique se há algum problema com a conexão.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data/Hora</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Observações</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultas.map((consulta) => (
                <TableRow key={consulta.id}>
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
                    {consulta.status?.nome === 'Pendente' && (
                      <>
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => handleAprovar(consulta.id)}
                          sx={{ mr: 1 }}
                        >
                          Aprovar
                        </Button>
                        <Button
                          color="error"
                          size="small"
                          onClick={() => handleRecusar(consulta.id)}
                        >
                          Recusar
                        </Button>
                      </>
                    )}
                    
                    {consulta.status?.nome === 'Confirmada' && (
                      <Button
                        color="success"
                        size="small"
                        onClick={() => {
                          setSelectedConsulta(consulta);
                          setDialogOpen(true);
                        }}
                      >
                        Finalizar
                      </Button>
                    )}
                    
                    {consulta.status?.nome === 'Concluída' && !consulta.tem_fatura && (
                      <Button
                        color="warning"
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenFaturaDialog(consulta)}
                      >
                        Criar Fatura
                      </Button>
                    )}
                    
                    {consulta.status?.nome === 'Concluída' && consulta.tem_fatura && (
                      <Button
                        color="success"
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewFatura(consulta)}
                      >
                        Ver Fatura
                      </Button>
                    )}
                    
                    {consulta.status?.nome !== 'Concluída' && consulta.status?.nome !== 'Cancelada' && (
                      <Button
                        color="info"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => {
                          setSelectedConsulta(consulta);
                          setSelectedStatus(consulta.status?.nome || '');
                          setStatusDialogOpen(true);
                        }}
                      >
                        Editar Status
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog para finalizar consulta */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
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
          <Button onClick={() => {
            setDialogOpen(false);
            setObservacoes('');
          }}>
            Cancelar
          </Button>
          <Button onClick={handleFinalizarConsulta} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para alterar status */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Alterar Status da Consulta</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selecione o novo status:
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {['Pendente', 'Confirmada', 'Concluída', 'Cancelada'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "contained" : "outlined"}
                  onClick={() => setSelectedStatus(status)}
                  color={
                    status === 'Pendente' ? 'warning' :
                    status === 'Confirmada' ? 'primary' :
                    status === 'Concluída' ? 'success' :
                    'error'
                  }
                >
                  {status}
                </Button>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleUpdateStatus} 
            color="primary" 
            variant="contained"
            disabled={!selectedStatus}
          >
            Salvar Alteração
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para criar fatura */}
      <Dialog open={faturaDialogOpen} onClose={() => setFaturaDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Criar Fatura para Consulta</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Consulta de: {selectedConsulta?.utilizador?.nome}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Data: {selectedConsulta ? new Date(selectedConsulta.data_hora).toLocaleString('pt-PT') : ''}
            </Typography>

            <TextField
              fullWidth
              type="number"
              label="Valor Total (€)"
              value={faturaData.valor_total}
              onChange={(e) => setFaturaData({ ...faturaData, valor_total: e.target.value })}
              margin="normal"
              inputProps={{ step: "0.01", min: "0" }}
              required
            />
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Observações"
              value={faturaData.observacoes}
              onChange={(e) => setFaturaData({ ...faturaData, observacoes: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setFaturaDialogOpen(false);
            setFaturaData({ valor_total: '', observacoes: '' });
          }}>
            Cancelar
          </Button>
          <Button 
            onClick={handleCriarFatura} 
            color="warning"
            variant="contained"
            disabled={!faturaData.valor_total || parseFloat(faturaData.valor_total) <= 0}
          >
            Emitir Fatura
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ConsultasComponent;