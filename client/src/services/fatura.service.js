import api from './api.config';

const API_URL = "http://localhost:8000/api";

const FaturaService = {
  // Obter todas as faturas do cliente logado
  getFaturasByCliente: async () => {
    try {
      const response = await api.get(`${API_URL}/faturas/cliente`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar faturas:", error);
      throw error;
    }
  },

  // Criar nova fatura para uma consulta
  criarFatura: async (consultaId, dados) => {
    try {
      const response = await api.post(`${API_URL}/faturas/consulta/${consultaId}`, dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar fatura:", error);
      throw error;
    }
  },

  // Editar uma fatura existente
  editarFatura: async (faturaId, dados) => {
    try {
      const response = await api.put(`${API_URL}/faturas/${faturaId}`, dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao editar fatura:", error);
      throw error;
    }
  },

  // Atualizar status da fatura
  atualizarStatusFatura: async (faturaId, statusId) => {
    try {
      const response = await api.put(`${API_URL}/faturas/${faturaId}/status`, { statusId });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status da fatura:", error);
      throw error;
    }
  },

  // Obter detalhes de uma fatura específica
  getFaturaById: async (id) => {
    try {
      const response = await api.get(`${API_URL}/faturas/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar detalhes da fatura:", error);
      throw error;
    }
  },

  // Registrar pagamento de fatura
  registrarPagamento: async (faturaId, dadosPagamento) => {
    try {
      const response = await api.post(`${API_URL}/faturas/${faturaId}/pagamento`, dadosPagamento);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar pagamento:", error);
      throw error;
    }
  },

  // Obter todas as faturas do médico
  getFaturasByMedico: async () => {
    try {
      const response = await api.get(`${API_URL}/faturas/medico`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar faturas do médico:", error);
      throw error;
    }
  },

  // Marcar uma fatura como paga
  marcarComoPaga: async (faturaId) => {
    try {
      const response = await api.put(`${API_URL}/faturas/${faturaId}/status`, { 
        statusId: 2 // 2 = Paga
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao marcar fatura como paga:", error);
      throw error;
    }
  },

  // Obter consultas concluídas sem fatura
  getConsultasConcluidasSemFatura: async () => {
    try {
      const response = await api.get(`${API_URL}/consultas/concluidas-sem-fatura`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar consultas concluídas sem fatura:", error);
      throw error;
    }
  },

  // Obter URL do PDF da fatura
  getPDFUrl: (faturaId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.accessToken : '';
    
    // Retorna a URL completa com o token de autenticação
    return `${API_URL}/faturas/${faturaId}/pdf?token=${token}`;
  },
};

export default FaturaService; 