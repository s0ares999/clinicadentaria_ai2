import api from './api.config';

class ClienteService {
  async getClienteProfile() {
    try {
      const response = await api.get('clientes/perfil');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  }

  async updateClienteProfile(clienteData) {
    try {
      const response = await api.put('/clientes/perfil', clienteData);
      if (response.data.success) {
        return response.data;
      }
      throw new Error(response.data.message || 'Erro ao atualizar perfil');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }

  async getConsultas() {
    try {
      const response = await api.get('clientes/consultas');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw error;
    }
  }
}

export default new ClienteService();