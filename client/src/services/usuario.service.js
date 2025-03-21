import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/utilizadores/';

class UsuarioService {
  async getAllUsuarios() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  async getUsuarioById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  async updateUsuario(id, userData) {
    return axios.put(API_URL + id, userData, { headers: authHeader() });
  }

  async deleteUsuario(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }

  async getAllClientes() {
    return axios.get(API_URL + 'clientes', { headers: authHeader() });
  }

  async getAllMedicos() {
    return axios.get(API_URL + 'medicos', { headers: authHeader() });
  }
}

export default new UsuarioService(); 