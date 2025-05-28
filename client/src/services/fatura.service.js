import api from './api.config';

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

  criarFatura: async (dados) => {
    const response = await api.post(`${API_URL}`, dados);
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
