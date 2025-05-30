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
  TextField,
  IconButton
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
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
  const [servicosDisponiveis, setServicosDisponiveis] = useState([]);
  const [faturaData, setFaturaData] = useState({
    observacoes: '',
    servicos: [
      { servico_id: '', quantidade: 1, preco_unitario: 0 }
    ]
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
    // Agora pega os serviços ativos da rota /faturas/servicos via FaturaService
    const loadServicos = async () => {
      try {
        const servicos = await FaturaService.getServicosAtivos();
        setServicosDisponiveis(servicos);
      } catch (error) {
        toast.error('Erro ao carregar serviços');
        setServicosDisponiveis([]);
      }
    };

    loadServicos();
  }, []);



  // Função para calcular total da fatura
  const calcularTotal = () => {
    return faturaData.servicos.reduce((acc, servico) => {
      const qtd = parseFloat(servico.quantidade) || 0;
      const preco = parseFloat(servico.preco_unitario) || 0;
      return acc + (qtd * preco);
    }, 0).toFixed(2);
  };

  // Quando o usuário escolher um serviço no dropdown:
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

const loadConsultas = async () => {
  try {
    setLoading(true);
    const consultasResponse = await ConsultaService.getConsultasMedico();

    // Para cada consulta, verificar se tem fatura
    const consultasComFatura = await Promise.all(
      consultasResponse.map(async (consulta) => {
        try {
          const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
          return {
            ...consulta,
            tem_fatura: !!fatura?.id,
          };
        } catch {
          return {
            ...consulta,
            tem_fatura: false,
          };
        }
      })
    );

    setConsultas(consultasComFatura);
    setLoading(false);
  } catch (error) {
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
    } catch {
      toast.error('Erro ao aprovar consulta');
    }
  };

  const handleRecusar = async (consultaId) => {
    try {
      await ConsultaService.recusarConsulta(consultaId);
      toast.success('Consulta recusada');
      loadConsultas();
    } catch {
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
    } catch {
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
    } catch {
      toast.error('Erro ao atualizar status da consulta');
    }
  };

  const handleOpenFaturaDialog = (consulta) => {
    setSelectedConsulta(consulta);
    setFaturaData({
      valor_total: '50.00',
      observacoes: `Consulta realizada em ${new Date(consulta.data_hora).toLocaleDateString('pt-PT')}`,
      servicos: [{ servico_id: '', quantidade: 1, preco_unitario: 0 }]
    });
    setFaturaDialogOpen(true);
  };

  const handleCriarFatura = async () => {
    try {
      if (!selectedConsulta) {
        toast.error('Consulta não selecionada');
        return;
      }

      const payload = {
        consulta_id: selectedConsulta.id,
        observacoes: faturaData.observacoes,
        status_id: 1, // Emitida
        servicos: faturaData.servicos.map(s => ({
          servico_id: parseInt(s.servico_id, 10),
          quantidade: parseInt(s.quantidade, 10),
          preco_unitario: parseFloat(s.preco_unitario)
        }))
      };

      console.log('Payload para criação da fatura:', payload);  // <-- Aqui o log

      await FaturaService.criarFatura(payload);
      toast.success('Fatura criada com sucesso!');
      setFaturaDialogOpen(false);
      setFaturaData({ observacoes: '', servicos: [{ servico_id: '', quantidade: 1, preco_unitario: 0 }] });
      loadConsultas();
    } catch (error) {
      console.error('Erro ao criar fatura:', error);
      if (error.response && error.response.data) {
        console.error('Detalhes do erro do backend:', error.response.data);
        toast.error(`Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        toast.error('Erro ao criar fatura');
      }
    }
  };


  const handleViewFatura = async (consulta) => {
    try {
      const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
      if (fatura && fatura.id) {
        const pdfUrl = FaturaService.getPDFUrl(fatura.id);
        window.open(pdfUrl, '_blank');
      } else {
        toast.error('Não foi possível localizar a fatura desta consulta');
      }
    } catch {
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
      ) : !consultas || consultas.length === 0 ? (
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
              {consultas?.map((consulta) => (
                <TableRow key={consulta.id}>
                  <TableCell>{new Date(consulta.data_hora).toLocaleString('pt-PT')}</TableCell>
                  <TableCell>{consulta.utilizador?.nome || 'Paciente não identificado'}</TableCell>
                  <TableCell>{consulta.status?.nome || 'Status desconhecido'}</TableCell>
                  <TableCell>{consulta.observacoes || 'Sem observações'}</TableCell>
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
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{ fontWeight: 'bold', display: 'inline-block', mr: 1 }}
                      >
                        Fatura já emitida
                      </Typography>
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
          <Button onClick={() => setStatusDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleUpdateStatus} variant="contained" color="primary">
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para criar fatura */}
      <Dialog open={faturaDialogOpen} onClose={() => setFaturaDialogOpen(false)} maxWidth="md" fullWidth>
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
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <TextField
                select
                label="Serviço"
                value={servico.servico_id}
                onChange={(e) => handleServicoChange(index, 'servico_id', e.target.value)}
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
                onChange={(e) => handleServicoChange(index, 'quantidade', e.target.value)}
                sx={{ width: '20%' }}
                inputProps={{ min: 1 }}
              />

              <TextField
                label="Preço Unitário"
                type="number"
                value={servico.preco_unitario}
                onChange={(e) => handleServicoChange(index, 'preco_unitario', e.target.value)}
                sx={{ width: '30%' }}
                inputProps={{ min: 0, step: 0.01 }}
                disabled // para que o usuário não altere manualmente, já vem do serviço
              />

              <IconButton onClick={() => removerServico(index)} color="error">
                <RemoveCircle />
              </IconButton>
            </Box>
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
          <Button onClick={() => setFaturaDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleCriarFatura}
            variant="contained"
            color="primary"
          >
            Criar Fatura
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ConsultasComponent;
