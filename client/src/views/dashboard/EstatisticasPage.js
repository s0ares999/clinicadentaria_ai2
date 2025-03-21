import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api.config';

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    .stat-title {
      color: #7f8c8d;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${props => props.iconBg || '#3498db'};
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
  }
  
  .stat-change {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    
    &.positive {
      color: #2ecc71;
    }
    
    &.negative {
      color: #e74c3c;
    }
    
    i {
      margin-right: 5px;
    }
  }
`;

const ChartContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      font-size: 1.25rem;
      color: #2c3e50;
      margin: 0;
    }
    
    .period-selector {
      display: flex;
      background-color: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
      
      button {
        background: none;
        border: none;
        padding: 8px 15px;
        cursor: pointer;
        transition: all 0.3s;
        
        &.active {
          background-color: #3498db;
          color: white;
        }
        
        &:hover:not(.active) {
          background-color: #e1e5e8;
        }
      }
    }
  }
  
  .chart-placeholder {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: #7f8c8d;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const TopServicesCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .service-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    
    &:last-child {
      border-bottom: none;
    }
    
    .service-name {
      font-weight: 500;
      color: #2c3e50;
    }
    
    .service-value {
      font-weight: 600;
      color: #3498db;
    }
  }
`;

const AppointmentStatusCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .status-chart-placeholder {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: #7f8c8d;
  }
  
  .status-legend {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    
    .legend-item {
      display: flex;
      align-items: center;
      
      .color-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      .status-name {
        font-size: 0.9rem;
        color: #2c3e50;
      }
      
      .status-value {
        margin-left: auto;
        font-weight: 600;
        color: #2c3e50;
      }
    }
  }
`;

const EstatisticasPage = () => {
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalAgendamentos: 0,
    totalFaturamento: 0,
    taxaOcupacao: 0
  });
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('month');
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('estatisticas');
      
      // Quando tivermos backend, usaremos os dados reais
      // Por enquanto, vamos simular alguns dados
      setStats({
        totalClientes: 124,
        totalAgendamentos: 38,
        totalFaturamento: 4850,
        taxaOcupacao: 78
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
      // Adicionar notificação de erro quando tivermos react-toastify
    }
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };
  
  // Dados simulados para os serviços mais populares
  const topServices = [
    { name: 'Limpeza Dentária', value: 42 },
    { name: 'Consulta de Rotina', value: 38 },
    { name: 'Tratamento de Canal', value: 23 },
    { name: 'Branqueamento', value: 18 },
    { name: 'Extração Dentária', value: 15 }
  ];
  
  // Dados simulados para o status dos agendamentos
  const appointmentStatus = [
    { name: 'Confirmados', value: 65, color: '#2ecc71' },
    { name: 'Pendentes', value: 25, color: '#f39c12' },
    { name: 'Cancelados', value: 10, color: '#e74c3c' }
  ];

  return (
    <>
      <PageTitle>Estatísticas e Análises</PageTitle>
      
      <StatsGrid>
        <StatCard iconBg="#3498db">
          <div className="stat-header">
            <div className="stat-title">TOTAL DE CLIENTES</div>
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <div className="stat-value">{stats.totalClientes}</div>
          <div className="stat-change positive">
            <i className="fas fa-arrow-up"></i> 12% desde o mês passado
          </div>
        </StatCard>
        
        <StatCard iconBg="#2ecc71">
          <div className="stat-header">
            <div className="stat-title">AGENDAMENTOS DO MÊS</div>
            <div className="stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
          </div>
          <div className="stat-value">{stats.totalAgendamentos}</div>
          <div className="stat-change positive">
            <i className="fas fa-arrow-up"></i> 8% desde o mês passado
          </div>
        </StatCard>
        
        <StatCard iconBg="#f39c12">
          <div className="stat-header">
            <div className="stat-title">FATURAMENTO MENSAL</div>
            <div className="stat-icon">
              <i className="fas fa-euro-sign"></i>
            </div>
          </div>
          <div className="stat-value">{formatCurrency(stats.totalFaturamento)}</div>
          <div className="stat-change positive">
            <i className="fas fa-arrow-up"></i> 15% desde o mês passado
          </div>
        </StatCard>
        
        <StatCard iconBg="#9b59b6">
          <div className="stat-header">
            <div className="stat-title">TAXA DE OCUPAÇÃO</div>
            <div className="stat-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
          </div>
          <div className="stat-value">{stats.taxaOcupacao}%</div>
          <div className="stat-change negative">
            <i className="fas fa-arrow-down"></i> 3% desde o mês passado
          </div>
        </StatCard>
      </StatsGrid>
      
      <ChartContainer>
        <div className="chart-header">
          <h2>Evolução de Faturamento</h2>
          <div className="period-selector">
            <button 
              className={chartPeriod === 'week' ? 'active' : ''}
              onClick={() => setChartPeriod('week')}
            >
              Semana
            </button>
            <button 
              className={chartPeriod === 'month' ? 'active' : ''}
              onClick={() => setChartPeriod('month')}
            >
              Mês
            </button>
            <button 
              className={chartPeriod === 'year' ? 'active' : ''}
              onClick={() => setChartPeriod('year')}
            >
              Ano
            </button>
          </div>
        </div>
        <div className="chart-placeholder">
          Gráfico de Faturamento - {chartPeriod === 'week' ? 'Semanal' : chartPeriod === 'month' ? 'Mensal' : 'Anual'}
          <br />
          <small>(Será implementado com biblioteca de gráficos)</small>
        </div>
      </ChartContainer>
      
      <TwoColumnGrid>
        <TopServicesCard>
          <h2>Serviços Mais Procurados</h2>
          {topServices.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="service-name">{service.name}</div>
              <div className="service-value">{service.value} agendamentos</div>
            </div>
          ))}
        </TopServicesCard>
        
        <AppointmentStatusCard>
          <h2>Status dos Agendamentos</h2>
          <div className="status-chart-placeholder">
            Gráfico de Pizza - Status
            <br />
            <small>(Será implementado com biblioteca de gráficos)</small>
          </div>
          <div className="status-legend">
            {appointmentStatus.map((status, index) => (
              <div className="legend-item" key={index}>
                <div 
                  className="color-indicator" 
                  style={{ backgroundColor: status.color }}
                ></div>
                <div className="status-name">{status.name}</div>
                <div className="status-value">{status.value}%</div>
              </div>
            ))}
          </div>
        </AppointmentStatusCard>
      </TwoColumnGrid>
    </>
  );
};

export default EstatisticasPage;
