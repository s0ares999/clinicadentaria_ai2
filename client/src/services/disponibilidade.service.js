import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/disponibilidades/';

class DisponibilidadeService {
  async getDisponibilidades() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  async getDisponibilidadesByMedico(medicoId) {
    return axios.get(API_URL + 'medico/' + medicoId, { headers: authHeader() });
  }

  async getDisponibilidadesByData(data) {
    return axios.get(API_URL + 'data/' + data, { headers: authHeader() });
  }

  async getDisponibilidadesByMedicoEData(medicoId, data) {
    return axios.get(API_URL + 'medico/' + medicoId + '/data/' + data, { headers: authHeader() });
  }

  async createDisponibilidade(disponibilidadeData) {
    return axios.post(API_URL, disponibilidadeData, { headers: authHeader() });
  }

  async updateDisponibilidade(id, disponibilidadeData) {
    return axios.put(API_URL + id, disponibilidadeData, { headers: authHeader() });
  }

  async deleteDisponibilidade(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new DisponibilidadeService(); 