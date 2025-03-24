import api from './api.config';

// Adicione a constante API_URL
const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:8000/api/' : '/api/');

class AuthService {
  async login(email, password) {
    try {
      console.log("\n=== INICIANDO LOGIN ===");
      console.log("📤 Enviando requisição para:", 'auth/signin');
      console.log("Dados enviados:", { 
        email, 
        passwordLength: password?.length || 0 
      });
      
      const response = await api.post('auth/signin', { 
        email, 
        password
      });

      console.log("\n📥 Resposta recebida:");
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      console.log("Dados:", {
        ...response.data,
        accessToken: response.data.accessToken ? '[PRESENTE]' : '[AUSENTE]'
      });

      if (!response.data.success || !response.data.accessToken) {
        console.error("❌ Resposta inválida:", response.data);
        throw new Error(response.data.message || 'Resposta inválida do servidor');
      }

      const userData = {
        ...response.data,
        tipo: response.data.tipo || 'cliente',
        accessToken: response.data.accessToken,
        id: response.data.id
      };

      console.log("\n💾 Salvando dados do usuário:", {
        ...userData,
        accessToken: '[PRESENTE]'
      });

      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
      
    } catch (error) {
      console.error("\n❌ Erro no login:");
      console.error("Status:", error.response?.status);
      console.error("Dados do erro:", error.response?.data);
      console.error("Mensagem:", error.message);
      console.error("Stack:", error.stack);

      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erro ao realizar login'
      );
    }
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  async register(email, senha, nome, telefone, role, dadosEspecificos = {}) {
    try {
      console.log(`Tentando registro em ${API_URL}auth/signup`);
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
      
      return await api.post('auth/signup', userData, config);
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
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      if (!user.accessToken) return null;

      // Verificar se o token está expirado
      const tokenInfo = this.decodeToken(user.accessToken);
      if (tokenInfo.exp && tokenInfo.exp * 1000 < Date.now()) {
        this.logout();
        return null;
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

  async refreshToken() {
    const user = this.getCurrentUser();
    if (!user?.refreshToken) return null;

    try {
      const response = await api.post('auth/refresh-token', {
        refreshToken: user.refreshToken
      });

      if (response.data.accessToken) {
        const updatedUser = {
          ...user,
          accessToken: response.data.accessToken
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return null;
    }
  }

  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return {};
    }
  }
}

export default new AuthService();
