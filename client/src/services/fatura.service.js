import api from './api.config';

const API_URL = "http://localhost:8000/api/faturas";

const FaturaService = {
  getFaturasByCliente: async () => {
    const response = await api.get(`${API_URL}/minhas-faturas`);
    return response.data;
  },

  criarFatura: async (dados) => {
    const response = await api.post(`${API_URL}`, dados);
    return response.data;
  },

  deletarFatura: async (faturaId) => {
    const response = await api.delete(`${API_URL}/${faturaId}`);
    return response.data;
  },

  // NOVA FUNÇÃO PARA BUSCAR SERVIÇOS ATIVOS
  getServicosAtivos: async () => {
    const response = await api.get(`${API_URL}/servicos`);
    return response.data;
  }
};

export default FaturaService;
