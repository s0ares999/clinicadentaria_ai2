import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/consultas/';

class ConsultaService {
  async getConsultas() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  async getConsultaById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  async createConsulta(consultaData) {
    return axios.post(API_URL, consultaData, { headers: authHeader() });
  }

  async updateConsulta(id, consultaData) {
    return axios.put(API_URL + id, consultaData, { headers: authHeader() });
  }

  async cancelConsulta(id) {
    return axios.put(API_URL + id + '/cancel', {}, { headers: authHeader() });
  }

  async getConsultasByCliente() {
    // Get current user
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Use the user's ID to get their consultations
    return axios.get(`${API_URL}cliente/${user.id}`, { headers: authHeader() });
  }

  async getConsultasByMedico(medicoId) {
    return axios.get(API_URL + 'medico/' + medicoId, { headers: authHeader() });
  }
}

export default new ConsultaService();