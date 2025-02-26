import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './views/HomePage';
import SobrePage from './views/SobrePage';
import ContactosPage from './views/ContactosPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import DashboardPage from './views/DashboardPage';
import ClientesPage from './views/dashboard/ClientesPage';
import FaturasPage from './views/dashboard/FaturasPage';
import AgendamentosPage from './views/dashboard/AgendamentosPage';
import EstatisticasPage from './views/dashboard/EstatisticasPage';
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Rota protegida que verifica se o usuário está autenticado e é admin
  const ProtectedRoute = ({ children, adminRequired = false }) => {
    const user = AuthService.getCurrentUser();
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    if (adminRequired && user.role !== 'admin') {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/contactos" element={<ContactosPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rotas protegidas que exigem autenticação como admin */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute adminRequired={true}>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/clientes" 
        element={
          <ProtectedRoute adminRequired={true}>
            <ClientesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/faturas" 
        element={
          <ProtectedRoute adminRequired={true}>
            <FaturasPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/agendamentos" 
        element={
          <ProtectedRoute adminRequired={true}>
            <AgendamentosPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/estatisticas" 
        element={
          <ProtectedRoute adminRequired={true}>
            <EstatisticasPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
