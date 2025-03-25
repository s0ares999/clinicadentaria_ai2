import api from './api.config';
import AuthService from './auth.service';
import UsuarioService from './usuario.service';

class MedicoService {
  async getMedicoPerfil() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não encontrado');
      }
      
      // Retornando diretamente a resposta do UsuarioService
      return await UsuarioService.getUsuarioById(user.id);
    } catch (error) {
      console.error('Erro ao buscar perfil do médico:', error);
      throw error;
    }
  }

  async updateMedicoPerfil(medicoData) {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não encontrado');
      }
      
      // Separar dados do utilizador e dados específicos do médico
      const utilizadorData = {
        nome: medicoData.nome,
        email: medicoData.email,
        telefone: medicoData.telefone
      };

      const medicoEspecificoData = {
        crm: medicoData.crm,
        especialidade_id: medicoData.especialidade_id,
        horarioAtendimento: medicoData.horarioAtendimento
      };

      // Atualizar ambas as tabelas
      const response = await api.put(`/medicos/${user.id}/perfil`, {
        utilizador: utilizadorData,
        medico: medicoEspecificoData
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao atualizar perfil do médico:', error);
      throw error;
    }
  }

  async getConsultas() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }
      
      // Usar a mesma rota que está definida no backend
      const response = await api.get(`consulta/utilizador/${user.id}?tipo=medico`);
      
      // Filtrar para remover consultas com status "Concluída" (status_id = 3)
      // Estas consultas devem aparecer apenas no histórico
      const consultasFiltradas = response.data.filter(consulta => 
        !consulta.status || consulta.status.id !== 3
      );
      
      console.log(`Total de consultas: ${response.data.length}, Após filtro: ${consultasFiltradas.length}`);
      
      return consultasFiltradas;
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      throw error;
    }
  }

  async getConsultasConcluidas() {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Usuário não identificado');
      }
      
      // Usar a mesma rota que está definida no backend
      const response = await api.get(`consulta/utilizador/${user.id}?tipo=medico`);
      
      // Filtrar para incluir apenas consultas com status "Concluída" (status_id = 3)
      const consultasConcluidas = response.data.filter(consulta => 
        consulta.status && consulta.status.id === 3
      );
      
      console.log(`Total de consultas: ${response.data.length}, Concluídas: ${consultasConcluidas.length}`);
      
      return consultasConcluidas;
    } catch (error) {
      console.error('Erro ao buscar consultas concluídas:', error);
      throw error;
    }
  }

  async getFaturas() {
    try {
      const user = AuthService.getCurrentUser();
      // Alterando para buscar faturas pelo ID do médico
      const response = await api.get(`/faturas/medico/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar faturas:', error);
      throw error;
    }
  }

  async corrigirRegistros() {
    try {
      const response = await api.post('/medicos/corrigir-registros');
      return response.data;
    } catch (error) {
      console.error('Erro ao corrigir registros:', error);
      throw error;
    }
  }
}

export default new MedicoService(); 