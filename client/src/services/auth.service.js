import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'signin', {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password, role = 'cliente', clienteData = null) {
    const requestData = {
      username,
      email,
      password,
      role
    };

    // Adicionar dados do cliente se fornecidos
    if (role === 'cliente' && clienteData) {
      requestData.clienteData = clienteData;
    }

    return axios.post(API_URL + 'signup', requestData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
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
}

export default new AuthService();
