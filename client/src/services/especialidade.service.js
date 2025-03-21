import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/especialidades/';

class EspecialidadeService {
  async getAllEspecialidades() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  async getEspecialidadeById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  async createEspecialidade(especialidadeData) {
    return axios.post(API_URL, especialidadeData, { headers: authHeader() });
  }

  async updateEspecialidade(id, especialidadeData) {
    return axios.put(API_URL + id, especialidadeData, { headers: authHeader() });
  }

  async deleteEspecialidade(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new EspecialidadeService(); 