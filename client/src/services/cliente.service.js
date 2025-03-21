import axios from 'axios';
import AuthService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ClienteService {
  constructor() {
    this.refreshAuth();
  }
  
  refreshAuth() {
    const user = AuthService.getCurrentUser();
    this.token = user?.accessToken;
    this.authHeader = this.token 
      ? { Authorization: `Bearer ${this.token}` } 
      : {};
    
    console.log("ClienteService - Token disponível:", this.token ? "Sim" : "Não");
  }

  async getClienteProfile() {
    this.refreshAuth(); // Sempre atualiza o token
    
    console.log("Buscando perfil do cliente em:", `${API_URL}/cliente/perfil`);
    
    try {
      const response = await axios.get(`${API_URL}/cliente/perfil`, {
        headers: this.authHeader,
        timeout: 5000 // 5 segundos timeout
      });
      
      if (response.data) {
        console.log("Resposta do servidor:", JSON.stringify(response.data));
      }
      
      return response;
    } catch (error) {
      this.logErrorDetails(error);
      throw error;
    }
  }
  
  logErrorDetails(error) {
    console.error("Erro ao comunicar com a API:", error.message);
    
    if (error.response) {
      // O servidor respondeu com status fora do intervalo 2xx
      console.error("Status:", error.response.status);
      console.error("Dados:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error("Sem resposta do servidor. Requisição:", error.request);
    } else {
      // Algo aconteceu na configuração da requisição
      console.error("Erro de configuração:", error.message);
    }
    
    console.error("Config completa:", error.config);
  }

  // Atualizar perfil do cliente
  async updateClienteProfile(clienteData) {
    this.refreshAuth(); // Garante que o token está atualizado
    console.log("Atualizando perfil, dados:", clienteData);
    return axios.put(`${API_URL}/cliente/perfil`, clienteData, {
      headers: this.authHeader
    });
  }

  // Obter histórico de consultas do cliente
  async getConsultas() {
    this.refreshAuth(); // Garante que o token está atualizado
    return axios.get(`${API_URL}/cliente/consultas`, {
      headers: this.authHeader
    });
  }
}

export default new ClienteService();