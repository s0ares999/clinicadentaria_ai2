import api from './api.config';
import AuthService from './auth.service';

class ConsultaService {
  async getConsultas() {
    return api.get('consulta');
  }

  async getConsultaById(id) {
    return api.get(`consulta/${id}`);
  }

  async createConsulta(consultaData) {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.accessToken) {
        throw new Error('Usuário não autenticado');
      }
      
      console.log('Enviando requisição com token:', user.accessToken.substring(0, 20) + '...');
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
      };
      
      return await api.post('consulta', consultaData, config);
    } catch (error) {
      console.error('Erro na chamada de API:', error);
      if (error.response) {
        console.error('Resposta de erro:', error.response.data);
      }
      throw error;
    }
  }

  async updateConsulta(id, consultaData) {
    return api.put(`consulta/${id}`, consultaData);
  }

  async cancelConsulta(id) {
    return api.put(`consulta/${id}/cancel`, {});
  }

  async getConsultasByCliente() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }
      
      console.log("Buscando consultas para o usuário:", user.id);
      const response = await api.get(`consulta/utilizador/${user.id}?tipo=cliente`);
      console.log("Resposta da API:", response);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas do cliente:', error);
      throw error;
    }
  }

  async getConsultasByMedico(medicoId) {
    return api.get(`consulta/medico/${medicoId}`);
  }

  async getConsultasMedico() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }
      
      const response = await api.get(`consulta/utilizador/${user.id}?tipo=medico`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw error;
    }
  }

  async finalizarConsulta(consultaId, observacoes) {
    try {
      const response = await api.put(`consulta/${consultaId}`, {
        status_id: 3, // ID para "Concluída"
        observacoes: observacoes
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao finalizar consulta:', error);
      throw error;
    }
  }

  async getConsultasPendentes() {
    return api.get('consulta/pendentes');
  }

  async aceitarConsulta(consultaId) {
    try {
      const response = await api.put(`consulta/${consultaId}/aceitar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao aceitar consulta:', error);
      throw error;
    }
  }

  async recusarConsulta(consultaId) {
    try {
      const response = await api.put(`consulta/${consultaId}/recusar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao recusar consulta:', error);
      throw error;
    }
  }

  async getConsultaStatus() {
    try {
      const response = await api.get('consulta/status');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar status de consulta:', error);
      throw error;
    }
  }
}

export default new ConsultaService();