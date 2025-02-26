import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    
    if (adminRequired && user.roles && !user.roles.includes('ROLE_ADMIN')) {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <div>
      <ToastContainer />
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
        >
          <Route index element={<EstatisticasPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="faturas" element={<FaturasPage />} />
          <Route path="agendamentos" element={<AgendamentosPage />} />
          <Route path="estatisticas" element={<EstatisticasPage />} />
        </Route>
        
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
