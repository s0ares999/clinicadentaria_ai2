import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreditosPage = () => {
  return (
    <div>
      <Navbar />
      
      <div className="container-fluid bg-primary text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-3 fw-bold">Créditos do Projeto</h1>
              <p className="lead">Sistema de Gestão de Clínica Dentária - UC AI2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">
                  <i className="fas fa-graduation-cap me-2"></i>
                  Informações Acadêmicas
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="text-primary">Projeto</h5>
                    <p><strong>Sistema de Gestão de Clínica Dentária</strong></p>
                    <p><strong>UC:</strong> Aplicações para a Internet II (AI2)</p>
                    <p><strong>Instituição:</strong> ESTGV</p>
                    <p><strong>Projeto Realizado por:</strong> Pedro Soares pv22896 e Hiago Freitas pv21081</p>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-primary">Tecnologias Obrigatórias</h5>
                    <div className="badge bg-success me-1 mb-1">React + Hooks</div>
                    <div className="badge bg-success me-1 mb-1">Bootstrap</div>
                    <div className="badge bg-success me-1 mb-1">MVC</div>
                    <div className="badge bg-success me-1 mb-1">PostgreSQL</div>
                    <div className="badge bg-success me-1 mb-1">Express</div>
                    <div className="badge bg-success me-1 mb-1">Axios</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-center mb-4">Funcionalidades Implementadas</h2>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Gestão de Utilizadores
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><i className="fas fa-check-circle text-success me-2"></i>Registo de utilizadores</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Autenticação JWT</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Perfis: Admin, Médico, Cliente</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Gestão de perfis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Sistema de Consultas
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><i className="fas fa-check-circle text-success me-2"></i>Agendamento de consultas</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Gestão de especialidades</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Histórico de consultas</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Status de consultas</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Consultas pendentes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-warning text-white">
                <h5 className="mb-0">
                  <i className="fas fa-file-invoice me-2"></i>
                  Sistema de Faturação
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><i className="fas fa-check-circle text-success me-2"></i>Geração de faturas</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Gestão de serviços</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Export para PDF</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Status de pagamento</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Histórico de faturas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-chart-bar me-2"></i>
                  Dashboards & Relatórios
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><i className="fas fa-check-circle text-success me-2"></i>Dashboard administrativo</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Dashboard do cliente</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Dashboard do médico</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Estatísticas em tempo real</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Gráficos com Recharts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-cogs me-2"></i>
                  Funcionalidades Técnicas
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><i className="fas fa-check-circle text-success me-2"></i>API RESTful</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Base de dados PostgreSQL</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>ORM Sequelize</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Middleware de auth</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i>Validação de dados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header text-white" style={{background: 'linear-gradient(45deg, #007bff, #6f42c1)'}}>
                <h5 className="mb-0">
                  <i className="fas fa-layer-group me-2"></i>
                  Stack Tecnológico
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h6 className="text-primary">Frontend</h6>
                    <div className="badge bg-primary me-1 mb-1">React.js</div>
                    <div className="badge bg-primary me-1 mb-1">Bootstrap</div>
                    <div className="badge bg-primary me-1 mb-1">Material-UI</div>
                    <div className="badge bg-primary me-1 mb-1">Styled Components</div>
                    <div className="badge bg-primary me-1 mb-1">Axios</div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="text-success">Backend</h6>
                    <div className="badge bg-success me-1 mb-1">Node.js</div>
                    <div className="badge bg-success me-1 mb-1">Express.js</div>
                    <div className="badge bg-success me-1 mb-1">JWT</div>
                    <div className="badge bg-success me-1 mb-1">bcryptjs</div>
                    <div className="badge bg-success me-1 mb-1">CORS</div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="text-info">Database</h6>
                    <div className="badge bg-info me-1 mb-1">PostgreSQL</div>
                    <div className="badge bg-info me-1 mb-1">Sequelize</div>
                    <div className="badge bg-info me-1 mb-1">Migrations</div>
                    <div className="badge bg-info me-1 mb-1">Seeds</div>
                  </div>
                  <div className="col-md-3">
                    <h6 className="text-warning">Tools</h6>
                    <div className="badge bg-warning text-dark me-1 mb-1">Recharts</div>
                    <div className="badge bg-warning text-dark me-1 mb-1">html2pdf</div>
                    <div className="badge bg-warning text-dark me-1 mb-1">React Icons</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">
                <i className="fas fa-award me-2"></i>
                ✅ Conformidade Acadêmica Verificada
              </h4>
              <p>Este projeto atende a <strong>todos os requisitos obrigatórios</strong> da UC AI2:</p>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1"><strong>✅ Arquitetura MVC:</strong> Implementada</p>
                  <p className="mb-1"><strong>✅ Bootstrap:</strong> Framework CSS principal</p>
                  <p className="mb-1"><strong>✅ PostgreSQL:</strong> Base de dados</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>✅ Sequelize:</strong> ORM</p>
                  <p className="mb-1"><strong>✅ Express.js:</strong> Servidor backend</p>
                  <p className="mb-1"><strong>✅ React + Hooks:</strong> Interface moderna</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default CreditosPage;
