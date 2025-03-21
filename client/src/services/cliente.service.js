import api from './api.config';

class ClienteService {
  async getClienteProfile() {
    try {
      const response = await api.get('cliente/perfil');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  }

  async updateClienteProfile(clienteData) {
    try {
      const response = await api.put('cliente/perfil', clienteData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }

  async getConsultas() {
    try {
      const response = await api.get('cliente/consultas');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw error;
    }
  }
}

export default new ClienteService();