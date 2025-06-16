import axios from 'axios';

const API_URL = 'https://clinica-dentaria-api.onrender.com/api/especialidades/';

class EspecialidadeService {
  async getAllEspecialidades() {
    return axios.get(API_URL);
  }

  async getEspecialidadeById(id) {
    return axios.get(API_URL);
  }

  async createEspecialidade(especialidadeData) {
    return axios.post(API_URL);
  }

  async updateEspecialidade(id, especialidadeData) {
    return axios.put(API_URL);
  }

  async deleteEspecialidade(id) {
    return axios.delete(API_URL);
  }
}

export default new EspecialidadeService(); 