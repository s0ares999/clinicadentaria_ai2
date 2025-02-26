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

  register(username, email, password) {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password
    });
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
    return !!user && user.role === 'admin';
  }
}

export default new AuthService();
