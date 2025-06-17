import api from './api.config';
import UtilizadorService from './utilizador.service';

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

  async getAllClientes() {
    // Admin: get all clients
    return UtilizadorService.getAllClientes();
  }

  async updateCliente(id, data) {
    // Admin: update client by id
    return UtilizadorService.updateUtilizador(id, data);
  }

  async deleteCliente(id) {
    // Admin: delete client by id
    return UtilizadorService.deleteUtilizador(id);
  }
}

export default new ClienteService();