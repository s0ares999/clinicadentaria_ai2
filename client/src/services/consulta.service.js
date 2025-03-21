import api from './api.config';

class ConsultaService {
  async getConsultas() {
    return api.get('consultas');
  }

  async getConsultaById(id) {
    return api.get(`consultas/${id}`);
  }

  async createConsulta(consultaData) {
    return api.post('consultas', consultaData);
  }

  async updateConsulta(id, consultaData) {
    return api.put(`consultas/${id}`, consultaData);
  }

  async cancelConsulta(id) {
    return api.put(`consultas/${id}/cancel`, {});
  }

  async getConsultasByCliente(clienteId) {
    return api.get(`consultas/cliente/${clienteId}`);
  }

  async getConsultasByMedico(medicoId) {
    return api.get(`consultas/medico/${medicoId}`);
  }
}

export default new ConsultaService();