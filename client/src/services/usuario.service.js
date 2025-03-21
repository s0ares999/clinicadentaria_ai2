import api from './api.config';

class UsuarioService {
  async getAllUsuarios() {
    return api.get('utilizadores');
  }

  async getUsuarioById(id) {
    return api.get(`utilizadores/${id}`);
  }

  async updateUsuario(id, userData) {
    return api.put(`utilizadores/${id}`, userData);
  }

  async deleteUsuario(id) {
    return api.delete(`utilizadores/${id}`);
  }

  async getAllClientes() {
    return api.get('utilizadores/clientes');
  }

  async getAllMedicos() {
    return api.get('utilizadores/medicos');
  }
}

export default new UsuarioService(); 