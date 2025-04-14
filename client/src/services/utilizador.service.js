import api from './api.config';
import AuthService from './auth.service';

class UtilizadorService {
  async getAllUtilizadores() {
    return api.get('/utilizador');
  }

  async getUtilizadorById(id) {
    try {
      const response = await api.get(`/utilizador/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar utilizador:', error);
      throw error;
    }
  }

  async uploadProfilePicture(file) {
    try {
      console.log("Iniciando upload simulado...");
      
      // Em vez de fazer upload para o servidor, vamos simular um upload bem-sucedido
      // Esta é uma solução temporária até que possamos resolver os problemas com a rota no servidor
      
      // Criar um FileReader para ler o arquivo como uma URL de dados (data URL)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
          const dataURL = reader.result;
          console.log("Imagem convertida para dataURL");
          
          // Simular uma resposta do servidor após um pequeno atraso
          setTimeout(() => {
            resolve({
              success: true,
              message: "Foto de perfil atualizada com sucesso (modo simulado)",
              imageUrl: dataURL
            });
          }, 500);
        };
        
        reader.onerror = (error) => {
          console.error("Erro ao ler arquivo:", error);
          reject(new Error("Não foi possível ler o arquivo"));
        };
        
        // Iniciar a leitura do arquivo como dataURL
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      throw error;
    }
  }

  async updateUtilizador(id, userData) {
    try {
      const response = await api.put(`/utilizador/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar utilizador:', error);
      throw error;
    }
  }

  async deleteUtilizador(id) {
    return api.delete(`/utilizador/${id}`);
  }

  async getAllClientes() {
    return api.get('/utilizador/clientes');
  }

  async getAllMedicos() {
    return api.get('/utilizador/medicos');
  }
}

export default new UtilizadorService(); 