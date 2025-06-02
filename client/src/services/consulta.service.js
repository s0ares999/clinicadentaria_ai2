import api from './api.config';
import AuthService from './auth.service';

class ConsultaService {
  async getConsultas() {
    return api.get('consultas');
  }

  async getConsultaById(id) {
    return api.get(`consultas/${id}`);
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

      return await api.post('consultas', consultaData, config);
    } catch (error) {
      console.error('Erro na chamada de API:', error);
      if (error.response) {
        console.error('Resposta de erro:', error.response.data);
      }
      throw error;
    }
  }



  async updateConsulta(id, consultaData) {
    return api.put(`consultas/${id}`, consultaData);
  }

  async cancelConsulta(id) {
    return api.put(`consultas/${id}/cancel`, {});
  }

  async getConsultasByCliente() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }

      console.log("Buscando consultas para o usuário:", user.id);
      const response = await api.get(`consultas/utilizador/${user.id}?tipo=cliente`);
      console.log("Resposta da API:", response);

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas do cliente:', error);
      throw error;
    }
  }

  async getHorariosDisponiveis(data) {
    try {
      const response = await api.get(`consultas/horarios-disponiveis?data=${data}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      throw error;
    }
  }

  async getConsultasMedico() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }

      const response = await api.get(`consultas/utilizador/${user.id}?tipo=medico`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw error;
    }
  }

  async finalizarConsulta(consultaId, observacoes) {
    try {
      const response = await api.put(`consultas/${consultaId}`, {
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
    return api.get('consultas/pendentes');
  }

  // CORRIGIDO: Agora usa a rota específica do backend
  async getConsultasConcluidas() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }

      // Usar a rota específica que criamos no backend
      const response = await api.get(`consultas/concluidas/medico/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar consultas concluídas:', error);
      throw error;
    }
  }

  async aceitarConsulta(consultaId) {
    try {
      const response = await api.put(`consultas/${consultaId}/aceitar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao aceitar consulta:', error);
      throw error;
    }
  }

  async recusarConsulta(consultaId) {
    try {
      const response = await api.put(`consultas/${consultaId}/recusar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao recusar consulta:', error);
      throw error;
    }
  }

  async getConsultaStatus() {
    try {
      const response = await api.get('consultas/status');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar status de consulta:', error);
      throw error;
    }
  }

  async getConsultasConfirmadas(data = null, medico_id = null) {
    try {
      const params = new URLSearchParams();
      if (data) params.append('data', data);
      if (medico_id) params.append('medico_id', medico_id);

      const queryString = params.toString();
      const url = queryString ? `consultas/confirmadas?${queryString}` : 'consultas/confirmadas';

      return await api.get(url);
    } catch (error) {
      console.error('Erro ao buscar consultas confirmadas:', error);
      throw error;
    }
  }

  async getFaturaFromConsulta(consultaId) {
    try {
      const response = await api.get(`consultas/${consultaId}/fatura`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar fatura da consulta ${consultaId}:`, error);
      throw error;
    }
  }

  

  // NOVO: Método para buscar consultas confirmadas de um médico específico
  async getConsultasConfirmadasByMedico(medicoId, data = null) {
    try {
      const params = new URLSearchParams();
      params.append('medico_id', medicoId);
      if (data) params.append('data', data);

      const queryString = params.toString();
      return await api.get(`consultas/confirmadas?${queryString}`);
    } catch (error) {
      console.error('Erro ao buscar consultas confirmadas do médico:', error);
      throw error;
    }
  }

  // NOVO: Método para buscar consultas confirmadas por data
  async getConsultasConfirmadasByData(data) {
    try {
      return await api.get(`consultas/confirmadas?data=${data}`);
    } catch (error) {
      console.error('Erro ao buscar consultas confirmadas por data:', error);
      throw error;
    }
  }
}

export default new ConsultaService();