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
  IconButton,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { 
  AddCircle, 
  RemoveCircle, 
  Receipt, 
  CheckCircle, 
  Search,
  FilterList,
  Clear
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import ConsultaService from '../../services/consulta.service';
import FaturaService from '../../services/fatura.service';

function MedicoFaturasPage() {
  const [consultas, setConsultas] = useState([]);
  const [consultasFiltradas, setConsultasFiltradas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [faturaDialogOpen, setFaturaDialogOpen] = useState(false);
  const [servicosDisponiveis, setServicosDisponiveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    paciente: '',
    data: ''
  });
  
  const [faturaData, setFaturaData] = useState({
    observacoes: '',
    servicos: [
      { servico_id: '', quantidade: 1, preco_unitario: 0 }
    ]
  });

  useEffect(() => {
    loadConsultasConcluidas();
    loadServicos();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [consultas, filtros]);

  const loadConsultasConcluidas = async () => {
    try {
      setLoading(true);
      const consultasResponse = await ConsultaService.getConsultasMedico();
      
      // Filtrar apenas consultas concluídas
      const consultasConcluidas = consultasResponse.filter(
        consulta => consulta.status?.nome === 'Concluída'
      );

      // Verificar quais já têm fatura
      const consultasComFatura = await Promise.all(
        consultasConcluidas.map(async (consulta) => {
          try {
            const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
            return {
              ...consulta,
              tem_fatura: !!fatura?.id,
              fatura_id: fatura?.id || null
            };
          } catch {
            return {
              ...consulta,
              tem_fatura: false,
              fatura_id: null
            };
          }
        })
      );

      setConsultas(consultasComFatura);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar consultas concluídas');
      setConsultas([]);
      setLoading(false);
    }
  };

  const loadServicos = async () => {
    try {
      const servicos = await FaturaService.getServicosAtivos();
      setServicosDisponiveis(servicos);
    } catch (error) {
      toast.error('Erro ao carregar serviços');
      setServicosDisponiveis([]);
    }
  };

  const aplicarFiltros = () => {
    let filtered = [...consultas];

    if (filtros.paciente) {
      filtered = filtered.filter(consulta =>
        consulta.utilizador?.nome?.toLowerCase().includes(filtros.paciente.toLowerCase())
      );
    }

    if (filtros.data) {
      filtered = filtered.filter(consulta => {
        const dataConsulta = new Date(consulta.data_hora).toISOString().split('T')[0];
        return dataConsulta === filtros.data;
      });
    }

    setConsultasFiltradas(filtered);
  };

  const limparFiltros = () => {
    setFiltros({
      paciente: '',
      data: ''
    });
  };

  const calcularTotal = () => {
    return faturaData.servicos.reduce((acc, servico) => {
      const qtd = parseFloat(servico.quantidade) || 0;
      const preco = parseFloat(servico.preco_unitario) || 0;
      return acc + (qtd * preco);
    }, 0).toFixed(2);
  };

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
    if (faturaData.servicos.length > 1) {
      const servicos = [...faturaData.servicos];
      servicos.splice(index, 1);
      setFaturaData({ ...faturaData, servicos });
    }
  };

  const handleOpenFaturaDialog = (consulta) => {
    setSelectedConsulta(consulta);
    setFaturaData({
      observacoes: `Consulta realizada em ${new Date(consulta.data_hora).toLocaleDateString('pt-PT')} - ${consulta.utilizador?.nome}`,
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

      // Validar se pelo menos um serviço foi selecionado
      const servicosValidos = faturaData.servicos.filter(s => s.servico_id && s.quantidade > 0);
      if (servicosValidos.length === 0) {
        toast.error('Selecione pelo menos um serviço');
        return;
      }

      const payload = {
        consulta_id: selectedConsulta.id,
        observacoes: faturaData.observacoes,
        status_id: 1,
        servicos: servicosValidos.map(s => ({
          servico_id: parseInt(s.servico_id, 10),
          quantidade: parseInt(s.quantidade, 10),
          preco_unitario: parseFloat(s.preco_unitario)
        }))
      };

      await FaturaService.criarFatura(payload);
      toast.success('Fatura criada com sucesso!');
      setFaturaDialogOpen(false);
      setFaturaData({ 
        observacoes: '', 
        servicos: [{ servico_id: '', quantidade: 1, preco_unitario: 0 }] 
      });
      loadConsultasConcluidas();
    } catch (error) {
      console.error('Erro ao criar fatura:', error);
      if (error.response && error.response.data) {
        toast.error(`Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        toast.error('Erro ao criar fatura');
      }
    }
  };

  const consultasSemFatura = consultasFiltradas.filter(c => !c.tem_fatura);
  const consultasComFatura = consultasFiltradas.filter(c => c.tem_fatura);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Receipt color="primary" />
          Criar Faturas
        </Typography>
        <Button
          onClick={loadConsultasConcluidas}
          variant="outlined"
          disabled={loading}
          startIcon={<Search />}
        >
          {loading ? 'Carregando...' : 'Recarregar'}
        </Button>
      </Box>

      {/* Cards de Resumo */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt color="warning" />
                <Box>
                  <Typography variant="h6">{consultasSemFatura.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sem Fatura
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                <Box>
                  <Typography variant="h6">{consultasComFatura.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Com Fatura
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList color="info" />
                <Box>
                  <Typography variant="h6">{consultasFiltradas.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Filtradas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt color="primary" />
                <Box>
                  <Typography variant="h6">{consultas.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Concluídas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          Filtros
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Nome do Paciente"
              value={filtros.paciente}
              onChange={(e) => setFiltros({ ...filtros, paciente: e.target.value })}
              placeholder="Digite o nome do paciente"
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Data da Consulta"
              type="date"
              value={filtros.data}
              onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
              InputLabelProps={{ shrink: true }}
              helperText="Filtrar consultas de um dia específico"
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={limparFiltros}
              startIcon={<Clear />}
            >
              Limpar Filtros
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography>Carregando consultas...</Typography>
        </Box>
      ) : (
        <>
          {/* Consultas sem Fatura */}
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt />
                Consultas Aguardando Fatura ({consultasSemFatura.length})
              </Typography>
              <Typography variant="body2">
                Consultas concluídas que ainda não possuem fatura criada
              </Typography>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Data/Hora</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Observações da Consulta</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consultasSemFatura.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="text.secondary">
                          {filtros.paciente || filtros.data 
                            ? 'Nenhuma consulta encontrada com os filtros aplicados'
                            : 'Todas as consultas concluídas já possuem fatura'
                          }
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    consultasSemFatura.map((consulta) => (
                      <TableRow key={consulta.id}>
                        <TableCell>
                          {new Date(consulta.data_hora).toLocaleString('pt-PT')}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {consulta.utilizador?.nome || 'Paciente não identificado'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {consulta.utilizador?.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {consulta.observacoes || 'Sem observações'}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="Concluída" 
                            color="success" 
                            size="small"
                            icon={<CheckCircle />}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleOpenFaturaDialog(consulta)}
                            startIcon={<Receipt />}
                          >
                            Criar Fatura
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Consultas com Fatura */}
          {consultasComFatura.length > 0 && (
            <Paper>
              <Box sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle />
                  Consultas com Fatura Criada ({consultasComFatura.length})
                </Typography>
                <Typography variant="body2">
                  Consultas que já possuem fatura emitida
                </Typography>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data/Hora</TableCell>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Observações da Consulta</TableCell>
                      <TableCell>Status da Fatura</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {consultasComFatura.map((consulta) => (
                      <TableRow key={consulta.id}>
                        <TableCell>
                          {new Date(consulta.data_hora).toLocaleString('pt-PT')}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {consulta.utilizador?.nome || 'Paciente não identificado'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {consulta.utilizador?.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {consulta.observacoes || 'Sem observações'}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="Fatura Criada" 
                            color="success" 
                            size="small"
                            icon={<CheckCircle />}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </>
      )}

      {/* Dialog para criar fatura */}
      <Dialog 
        open={faturaDialogOpen} 
        onClose={() => setFaturaDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Receipt color="primary" />
            Criar Fatura - {selectedConsulta?.utilizador?.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data da consulta: {selectedConsulta && new Date(selectedConsulta.data_hora).toLocaleString('pt-PT')}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <TextField
            label="Observações da Fatura"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={faturaData.observacoes}
            onChange={(e) => setFaturaData({ ...faturaData, observacoes: e.target.value })}
            placeholder="Digite observações para a fatura..."
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Serviços
          </Typography>

          {faturaData.servicos.map((servico, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    label="Serviço"
                    fullWidth
                    value={servico.servico_id}
                    onChange={(e) => handleServicoChange(index, 'servico_id', e.target.value)}
                    SelectProps={{ native: true }}
                  >
                    <option value="">Selecione um serviço</option>
                    {servicosDisponiveis.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.nome} - €{s.preco}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} md={2}>
                  <TextField
                    label="Quantidade"
                    type="number"
                    fullWidth
                    value={servico.quantidade}
                    onChange={(e) => handleServicoChange(index, 'quantidade', e.target.value)}
                    inputProps={{ min: 1 }}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <TextField
                    label="Preço Unitário (€)"
                    type="number"
                    fullWidth
                    value={servico.preco_unitario}
                    onChange={(e) => handleServicoChange(index, 'preco_unitario', e.target.value)}
                    inputProps={{ min: 0, step: 0.01 }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton 
                      onClick={() => removerServico(index)} 
                      color="error"
                      disabled={faturaData.servicos.length === 1}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Subtotal: €{((parseFloat(servico.quantidade) || 0) * (parseFloat(servico.preco_unitario) || 0)).toFixed(2)}
              </Typography>
            </Paper>
          ))}

          <Button
            startIcon={<AddCircle />}
            onClick={adicionarServico}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Adicionar Serviço
          </Button>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" color="primary">
              Valor Total: €{calcularTotal()}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setFaturaDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleCriarFatura}
            variant="contained"
            color="primary"
            startIcon={<Receipt />}
          >
            Criar Fatura
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MedicoFaturasPage;