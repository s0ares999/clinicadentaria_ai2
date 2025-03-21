import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './views/HomePage';
import SobrePage from './views/SobrePage';
import ContactosPage from './views/ContactosPage';
import ClientesPublicPage from './views/ClientesPublicPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import DashboardPage from './views/DashboardPage';
import ClientDashboardPage from './views/ClientDashboardPage';
import ClientesPage from './views/dashboard/ClientesPage';
import FaturasPage from './views/dashboard/FaturasPage';
import AgendamentosPage from './views/dashboard/AgendamentosPage';
import EstatisticasPage from './views/dashboard/EstatisticasPage';
import AuthService from './services/auth.service';
import ServiceDetailPage from './components/ServiceDetailPage';


function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Função de depuração para verificar exatamente por que o acesso está sendo negado
  const checkClientAccess = (user) => {
    if (!user) {
      console.log("Acesso negado: Usuário não encontrado");
      return false;
    }
    
    console.log("Dados do usuário para verificação:", user);
    
    // Verifica se o usuário tem as propriedades esperadas
    const isRole = user.role === 'cliente';
    const isTipo = user.tipo === 'cliente';
    const isTipoUtilizador = user.tipoUtilizador && user.tipoUtilizador.nome === 'cliente';
    const hasCliente = user.cliente !== null && user.cliente !== undefined;
    
    console.log("Verificações:", { isRole, isTipo, isTipoUtilizador, hasCliente });
    
    return isRole || isTipo || isTipoUtilizador || hasCliente;
  };

  // Rota protegida melhorada
  const ProtectedRoute = ({ children, adminRequired = false, clienteRequired = false }) => {
    const user = AuthService.getCurrentUser();
    console.log("ProtectedRoute - User completo:", user);
    
    if (!user) {
      console.log("Redirecionando: Usuário não autenticado");
      return <Navigate to="/login" />;
    }
    
    if (adminRequired && user.role !== 'admin' && user.tipo !== 'admin') {
      console.log("Redirecionando: Acesso de admin requerido");
      return <Navigate to="/" />;
    }
    
    if (clienteRequired) {
      const isClient = checkClientAccess(user);
      console.log("Resultado da verificação de cliente:", isClient);
      
      if (!isClient) {
        console.log("Redirecionando: Acesso de cliente requerido");
        return <Navigate to="/" />;
      }
    }
    
    console.log("Acesso concedido!");
    return children;
  };

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contactos" element={<ContactosPage />} />
        <Route path="/clientes" element={<ClientesPublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/servicos/:title" element={<ServiceDetailPage/>} />
        
        {/* Rotas protegidas que exigem autenticação como admin */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute adminRequired={true}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        >
          <Route index element={<EstatisticasPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="faturas" element={<FaturasPage />} />
          <Route path="agendamentos" element={<AgendamentosPage />} />
          <Route path="estatisticas" element={<EstatisticasPage />} />
        </Route>
        
        {/* Rotas protegidas que exigem autenticação como cliente */}
        <Route 
          path="/cliente-dashboard/*" 
          element={
            <ProtectedRoute clienteRequired={true}>
              <ClientDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </div>
  );
}

export default App;
