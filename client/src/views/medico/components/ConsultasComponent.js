import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Box
} from '@mui/material';
import { toast } from 'react-hot-toast';
import ConsultaService from '../../../services/consulta.service';
import FaturaService from '../../../services/fatura.service';

// Importar os novos componentes
import ConsultaTableRow from '../../../components/ConsultaTableRow';
import FinalizarConsultaDialog from '../../../components/FinalizarConsultaDialog';
import StatusDialog from '../../../components/StatusDialog';
import CriarFaturaDialog from '../../../components/CriarFaturaDialog';

function ConsultasComponent() {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [servicosDisponiveis, setServicosDisponiveis] = useState([]);
  
  // Estados dos dialogs
  const [finalizarDialogOpen, setFinalizarDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [faturaDialogOpen, setFaturaDialogOpen] = useState(false);

  useEffect(() => {
    loadConsultas();
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      const servicos = await FaturaService.getServicosAtivos();
      setServicosDisponiveis(servicos);
    } catch (error) {
      toast.error('Erro ao carregar serviços');
      setServicosDisponiveis([]);
    }
  };

  const loadConsultas = async () => {
    try {
      setLoading(true);
      const consultasResponse = await ConsultaService.getConsultasMedico();

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

  const handleFinalizar = (consulta) => {
    setSelectedConsulta(consulta);
    setFinalizarDialogOpen(true);
  };

  const handleFinalizarConsulta = async (observacoes) => {
    try {
      await ConsultaService.finalizarConsulta(selectedConsulta.id, observacoes);
      toast.success('Consulta finalizada com sucesso!');
      setFinalizarDialogOpen(false);
      loadConsultas();
    } catch {
      toast.error('Erro ao finalizar consulta');
    }
  };

  const handleEditarStatus = (consulta) => {
    setSelectedConsulta(consulta);
    setStatusDialogOpen(true);
  };

  const handleUpdateStatus = async (selectedStatus) => {
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

  const handleCriarFatura = (consulta) => {
    setSelectedConsulta(consulta);
    setFaturaDialogOpen(true);
  };

  const handleCriarFaturaConfirm = async (faturaData) => {
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

      console.log('Payload para criação da fatura:', payload);

      await FaturaService.criarFatura(payload);
      toast.success('Fatura criada com sucesso!');
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
                <ConsultaTableRow
                  key={consulta.id}
                  consulta={consulta}
                  onAprovar={handleAprovar}
                  onRecusar={handleRecusar}
                  onFinalizar={handleFinalizar}
                  onCriarFatura={handleCriarFatura}
                  onEditarStatus={handleEditarStatus}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialogs */}
      <FinalizarConsultaDialog
        open={finalizarDialogOpen}
        onClose={() => setFinalizarDialogOpen(false)}
        consulta={selectedConsulta}
        onConfirm={handleFinalizarConsulta}
      />

      <StatusDialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        consulta={selectedConsulta}
        onUpdate={handleUpdateStatus}
      />

      <CriarFaturaDialog
        open={faturaDialogOpen}
        onClose={() => setFaturaDialogOpen(false)}
        consulta={selectedConsulta}
        servicosDisponiveis={servicosDisponiveis}
        onCriar={handleCriarFaturaConfirm}
      />
    </Box>
  );
}

export default ConsultasComponent;