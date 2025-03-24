import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import MedicoDashboardPage from './views/medico/MedicoDashboardPage';
import MedicoConsultasPendentesPage from './views/medico/MedicoConsultasPendentesPage';

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
    if (!user) return false;
    return user.tipo === 'cliente';
  };

  // Adicione esta função de verificação para médicos
  const checkMedicoAccess = (user) => {
    if (!user) return false;
    return user.tipo === 'medico';
  };

  // Rota protegida melhorada
  const ProtectedRoute = ({ children, adminRequired = false, clienteRequired = false, medicoRequired = false }) => {
    const user = AuthService.getCurrentUser();
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    if (adminRequired && user.role !== 'admin' && user.tipo !== 'admin') {
      return <Navigate to="/" />;
    }
    
    if (clienteRequired) {
      const isClient = checkClientAccess(user);
      
      if (!isClient) {
        return <Navigate to="/" />;
      }
    }

    if (medicoRequired && !checkMedicoAccess(user)) {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <div className="App">
      <Toaster position="top-center" />
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

        {/* Rotas protegidas que exigem autenticação como médico */}
        <Route 
          path="/medico/*"
          element={
            <ProtectedRoute medicoRequired={true}>
              <MedicoDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/medico/consultas-pendentes" element={<MedicoConsultasPendentesPage />} />
        
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
