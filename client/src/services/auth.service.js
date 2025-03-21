import axios from 'axios';

// Detectar automaticamente o ambiente e configurar a URL base
const baseURL = process.env.REACT_APP_API_URL || 
               (window.location.hostname === 'localhost' ? 
                'http://localhost:8000/api/' : 
                '/api/');

const API_URL = `${baseURL}auth/`;

class AuthService {
  login(email, password) {
    console.log("Tentando login com:", email);
    // Remover barras à direita para evitar URL com barras duplas
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    
    return axios
      .post(`${baseUrl}/signin`, {
        email,
        password
      })
      .then(response => {
        console.log("Login bem-sucedido:", response.data);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(error => {
        console.error("Erro no login:", error);
        console.error("URL usada:", `${baseUrl}/signin`);
        
        if (error.response) {
          console.error("Resposta do servidor:", error.response.data);
          console.error("Status:", error.response.status);
        }
        
        throw error;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(email, senha, nome, telefone, role, dadosEspecificos = {}) {
    try {
      console.log(`Tentando registro em ${API_URL}signup`);
      console.log("Dados a enviar:", {
        nome, email, senha, telefone, tipo: role, ...dadosEspecificos
      });
      
      // Adicionar timeout maior para depuração
      const config = {
        timeout: 10000 // 10 segundos
      };
      
      // Preparar os dados de acordo com o modelo do backend
      const userData = {
        nome,
        email,
        senha,
        telefone,
        tipo: role,
        ...dadosEspecificos // Inclui todos os dados específicos (data_nascimento, morada, nif, etc.)
      };
      
      console.log("Dados completos a enviar:", userData);
      
      return await axios.post(API_URL + 'signup', userData, config);
    } catch (error) {
      console.error("Service: erro no registro", error);
      
      // Mais informações de diagnóstico
      if (error.code === 'ERR_NETWORK') {
        console.error("Detalhes do erro de rede:", {
          message: error.message,
          url: API_URL + 'signup',
          serverStatus: "Não respondendo ou inacessível"
        });
      }
      
      throw error;
    }
  }

  getCurrentUser() {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      console.log('Auth.service - Retrieved user from localStorage:', user);
      
      // Se o token está disponível, extrair as informações dele para garantir
      if (user && user.accessToken) {
        try {
          const tokenPayload = JSON.parse(atob(user.accessToken.split('.')[1]));
          console.log('Token payload:', tokenPayload);
          
          // Atualizar o objeto user com as informações do token
          if (tokenPayload) {
            user.role = tokenPayload.role || user.role;
            user.tipo = tokenPayload.tipo || user.tipo;
          }
        } catch (e) {
          console.error('Erro ao decodificar token:', e);
        }
      }
      
      return user;
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      return null;
    }
  }

  // Verificar se o token ainda é válido (isso poderia ser expandido para incluir verificação de expiração)
  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user && !!user.accessToken;
  }

  // Verificar se o usuário é admin
  isAdmin() {
    const user = this.getCurrentUser();
    return !!user && user.roles && user.roles.includes('ROLE_ADMIN');
  }

  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.tipoUtilizador) return false;
    return user.user.tipoUtilizador.nome === requiredRole;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.accessToken;
  }
}

export default new AuthService();
