import api from './api.config';
import AuthService from './auth.service';

const API_URL = "http://localhost:8000/api/faturas";

const FaturaService = {

  getTodasFaturas: async () => {
    const response = await api.get(`${API_URL}`);
    return response.data;
  },

  getFaturasByCliente: async () => {
    const response = await api.get(`${API_URL}/minhas-faturas`);
    return response.data;
  },

  // NOVO: Método para buscar faturas do médico autenticado
  getFaturasByMedico: async () => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }

      console.log("Buscando faturas para o médico:", user.id);
      const response = await api.get(`${API_URL}/medico/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar faturas do médico:', error);
      throw error;
    }
  },

  criarFatura: async (dados) => {
    const response = await api.post(`${API_URL}`, dados);
    return response.data;
  },

  atualizarStatusFatura: async (faturaId, status_id) => {
    const response = await api.put(`${API_URL}/${faturaId}/status`, { status_id });
    return response.data;
  },

  deletarFatura: async (faturaId) => {
    const response = await api.delete(`${API_URL}/${faturaId}`);
    return response.data;
  },

  // FUNÇÕES PARA SERVIÇOS
  getServicosAtivos: async () => {
    const response = await api.get(`${API_URL}/servicos`);
    return response.data;
  },

  criarServico: async (dados) => {
    const response = await api.post(`${API_URL}/servicos`, dados);
    return response.data;
  },

  editarServico: async (id, dados) => {
    const response = await api.put(`${API_URL}/servicos/${id}`, dados);
    return response.data;
  },

  deletarServico: async (id) => {
    const response = await api.delete(`${API_URL}/servicos/${id}`);
    return response.data;
  },

  contarServicosPorNome: async () => {
    const response = await api.get(`${API_URL}/contar-servicos`);
    return response.data;
  },
};

export default FaturaService;