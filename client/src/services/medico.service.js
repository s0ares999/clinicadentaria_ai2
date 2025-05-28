import api from './api.config';
import AuthService from './auth.service';


class MedicoService {
  async getMedicoPerfil() {
    try {
      return await api.get('/medicos/perfil');
    } catch (error) {
      console.error('Erro ao buscar perfil do médico:', error);
      throw error;
    }
  }

  async getAllMedicos() {
  try {
    const response = await api.get('/utilizador/medicos');
    return response;
  } catch (error) {
    console.error('Erro ao buscar todos os médicos:', error);
    throw error;
  }
}


  async updateMedicoPerfil(medicoData) {
    try {
      const user = AuthService.getCurrentUser();
      if (!user || !user.id) {
        throw new Error('Utilizador não encontrado');
      }
      
      // Separar dados do utilizador e dados específicos do médico
      const utilizadorData = {
        nome: medicoData.nome,
        email: medicoData.email,
        telefone: medicoData.telefone
      };

      // Obter o especialidade_id da tabela Especialidade pelo nome, se existir
      let especialidade_id = 1; // Default para caso de erro
      
      try {
        if (medicoData.especialidade && medicoData.especialidade !== 'Não informada') {
          // Buscar o ID da especialidade pelo nome
          const especialidadeResponse = await api.get(`/especialidades/nome/${encodeURIComponent(medicoData.especialidade)}`);
          if (especialidadeResponse.data && especialidadeResponse.data.id) {
            especialidade_id = especialidadeResponse.data.id;
          }
        }
      } catch (error) {
        console.error('Erro ao buscar especialidade:', error);
        // Continuar com o ID padrão
      }

      const medicoEspecificoData = {
        crm: medicoData.crm || 'PENDENTE',
        especialidade_id: especialidade_id
      };

      console.log('Dados para atualização:', {
        utilizador: utilizadorData,
        medico: medicoEspecificoData
      });

      // Atualizar usando a rota específica de médicos
      const response = await api.put(`/medicos/${user.id}/perfil`, {
        utilizador: utilizadorData,
        medico: medicoEspecificoData
      });

      console.log('Resposta da atualização:', response.data);

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
        throw new Error('Utilizador não identificado');
      }
      
      // Usar a mesma rota que está definida no backend
      const response = await api.get(`/consultas/utilizador/${user.id}?tipo=medico`);
      
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
        throw new Error('Utilizador não identificado');
      }
      
      // Usar a mesma rota que está definida no backend
      const response = await api.get(`/consultas/utilizador/${user.id}?tipo=medico`);
      
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
}

export default new MedicoService(); 