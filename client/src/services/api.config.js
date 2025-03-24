import axios from 'axios';
import AuthService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Função para obter cabeçalhos de autenticação
const authHeader = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
};

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      console.log("Adicionando token à requisição:", config.url);
    } else {
      console.log("Requisição sem token:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros e refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshed = await AuthService.refreshToken();
        if (refreshed) {
          originalRequest.headers['Authorization'] = `Bearer ${refreshed.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        AuthService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 