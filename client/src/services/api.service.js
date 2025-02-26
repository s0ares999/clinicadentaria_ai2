import axios from 'axios';
import authService from './auth.service';

const API_URL = 'http://localhost:5000/api/';

// Criar uma instância do axios com configuração base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicionar interceptor para incluir token de autenticação em cada requisição
apiClient.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user && user.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + user.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionar interceptor para tratar erros comuns nas respostas
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratar erro 401 (não autorizado)
    if (error.response && error.response.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviço para clientes
const clienteService = {
  getAll: () => apiClient.get('clientes'),
  get: (id) => apiClient.get(`clientes/${id}`),
  create: (data) => apiClient.post('clientes', data),
  update: (id, data) => apiClient.put(`clientes/${id}`, data),
  delete: (id) => apiClient.delete(`clientes/${id}`)
};

// Serviço para faturas
const faturaService = {
  getAll: () => apiClient.get('faturas'),
  get: (id) => apiClient.get(`faturas/${id}`),
  getByCliente: (clienteId) => apiClient.get(`faturas/cliente/${clienteId}`),
  create: (data) => apiClient.post('faturas', data),
  update: (id, data) => apiClient.put(`faturas/${id}`, data),
  delete: (id) => apiClient.delete(`faturas/${id}`)
};

// Serviço para agendamentos
const agendamentoService = {
  getAll: () => apiClient.get('agendamentos'),
  get: (id) => apiClient.get(`agendamentos/${id}`),
  getByCliente: (clienteId) => apiClient.get(`agendamentos/cliente/${clienteId}`),
  getByData: (data) => apiClient.get(`agendamentos/data/${data}`),
  create: (data) => apiClient.post('agendamentos', data),
  update: (id, data) => apiClient.put(`agendamentos/${id}`, data),
  delete: (id) => apiClient.delete(`agendamentos/${id}`)
};

// Serviço para usuários (normalmente usado apenas por admins)
const userService = {
  getAll: () => apiClient.get('users'),
  get: () => apiClient.get('users/me')
};

export { clienteService, faturaService, agendamentoService, userService };
