import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './views/HomePage';
import SobrePage from './views/SobrePage';
import ContactosPage from './views/ContactosPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import DashboardPage from './views/DashboardPage';
import ClientDashboardPage from './views/cliente/ClientDashboardPage';
import FaturasPage from './views/admin/dashboard/FaturasPage';
import AgendamentosPage from './views/admin/dashboard/AgendamentosPage';
import EstatisticasPage from './views/admin/dashboard/EstatisticasPage';
import AuthService from './services/auth.service';
import ServiceDetailPage from './components/ServiceDetailPage';
import MedicoDashboardPage from './views/medico/MedicoDashboardPage';
import MedicoConsultasPendentesPage from './views/medico/MedicoConsultasPendentesPage';
import AdminMedicoPage from './views/admin/AdminMedicoPage'
import AdminClientePage from './views/admin/AdminClientePage'
import GestaoServicos from './views/admin/dashboard/GestaoServicos'
import FaturaDetalhesPage from './views/admin/dashboard/FaturasDetalhesPage';

// Componente de Rota Protegida
const ProtectedRoute = ({ children, adminRequired = false, clienteRequired = false, medicoRequired = false }) => {
  const user = AuthService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (adminRequired && user.tipo !== 'admin' && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  if (clienteRequired && user.tipo !== 'cliente') {
    return <Navigate to="/" />;
  }

  if (medicoRequired && user.tipo !== 'medico') {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="App">
      <Toaster position="top-center" />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contactos" element={<ContactosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/servicos/:title" element={<ServiceDetailPage/>} />
        
        {/* Admin Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute adminRequired={true}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        >
          <Route index element={<EstatisticasPage />} />
          <Route path="faturas" element={<FaturasPage />} />
          <Route path="agendamentos" element={<AgendamentosPage />} />
          <Route path="estatisticas" element={<EstatisticasPage />} />
          <Route path="GestaoMedico" element={<AdminMedicoPage />} />
          <Route path="GestaoClientes" element={<AdminClientePage />} />
          <Route path="GestaoServicos" element={<GestaoServicos />} />
          <Route path="faturas/:id" element={<FaturaDetalhesPage />} />
        </Route>
        
        {/* Cliente Dashboard */}
        <Route 
          path="/cliente-dashboard/*" 
          element={
            <ProtectedRoute clienteRequired={true}>
              <ClientDashboardPage />
            </ProtectedRoute>
          } 
        />

        {/* Médico Dashboard */}
        <Route 
          path="/medico/*"
          element={
            <ProtectedRoute medicoRequired={true}>
              <MedicoDashboardPage />
            </ProtectedRoute>
          } 
        >
          <Route path="consultas-pendentes" element={<MedicoConsultasPendentesPage />} />
        </Route>
        
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
