import api from './api.config';

class FaturaService {
  async getFaturasMedico() {
    try {
      const response = await api.get('/medico/faturas');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar faturas:', error);
      throw error;
    }
  }

  async emitirFatura(consultaId) {
    try {
      const response = await api.post(`/medico/faturas/emitir/${consultaId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao emitir fatura:', error);
      throw error;
    }
  }

  async getFaturaPDF(faturaId) {
    try {
      const response = await api.get(`/faturas/${faturaId}/pdf`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar PDF da fatura:', error);
      throw error;
    }
  }
}

export default new FaturaService(); 