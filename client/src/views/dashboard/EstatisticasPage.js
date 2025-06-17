import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api.config';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import FaturaService from '../../services/fatura.service'; // ajuste o caminho conforme seu projeto


const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // agora 3 colunas
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
  const [faturamentoData, setFaturamentoData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalConsultas: 0,
    totalFaturamento: 0,
    taxaOcupacao: 0,
    statusAgendamentos: {
      confirmado: 0,
      pendente: 0,
      cancelado: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('month');
  const [statusAgendamentos, setStatusAgendamentos] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchTopServices();
  }, []);

  useEffect(() => {
    fetchFaturamento(chartPeriod);
  }, [chartPeriod]);

  const fetchFaturamento = async (period) => {
    try {
      const response = await api.get(`/estatisticas/faturamento?periodo=${period}`);
      const dadosFormatados = response.data.map(item => ({
        nome: item.periodo,
        valor: item.valor
      }));

      console.log('Faturamento:', dadosFormatados); // 👈 adicione aqui
      setFaturamentoData(dadosFormatados);
    } catch (error) {
      console.error('Erro ao buscar evolução do faturamento:', error);
    }
  };


  const fetchStats = async () => {
    try {
      setLoading(true);

      const [resEstatisticas, resStatus] = await Promise.all([
        api.get('/estatisticas'),
        api.get('/estatisticas/status')
      ]);

      setStats(resEstatisticas.data);
      setStatusAgendamentos(resStatus.data);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      setLoading(false);
    }
  };


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const fetchTopServices = async () => {
    try {
      const data = await FaturaService.contarServicosPorNome();
      setTopServices(data); // supondo que sua API retorna array com { nome, quantidade }
    } catch (error) {
      console.error('Erro ao buscar serviços mais procurados:', error);
    }
  };

  {
    topServices.map((service, index) => (
      <div className="service-item" key={index}>
        <div className="service-name">{service.nome}</div>
        <div className="service-value">{service.quantidade} agendamentos</div>
      </div>
    ))
  }

  const statusColors = {
    confirmada: '#2ecc71',
    pendente: '#f39c12',
    cancelada: '#e74c3c',
    concluida: '#9b59b6' // nova cor para "Concluída"
  };

  const statusLabels = {
    pendente: 'Pendentes',
    confirmada: 'Confirmadas',
    cancelada: 'Canceladas',
    concluida: 'Concluídas'
  };

  const totalStatus = statusAgendamentos.reduce((sum, item) => sum + item.quantidadeConsultas, 0);

  const appointmentStatus = statusAgendamentos.map(status => {
    const key = status.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return {
      name: statusLabels[key] || status.nome, // Pluralizado se existir
      value: totalStatus ? Math.round((status.quantidadeConsultas / totalStatus) * 100) : 0,
      color: statusColors[key] || '#95a5a6'
    };
  });


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
          <div className="stat-value">{stats.totalConsultas}</div>
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
        {faturamentoData.length === 0 ? (
          <div className="chart-placeholder">Sem dados para o período selecionado.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={faturamentoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="valor" stroke="#3498db" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>


      <TwoColumnGrid>
        <TopServicesCard>
          <h2>Serviços Mais Procurados</h2>
          {topServices.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            topServices.map((service, index) => (
              <div className="service-item" key={index}>
                <div className="service-name">{service.nome}</div>
                <div className="service-value">{service.totalFeito} agendamentos</div>
              </div>
            ))
          )}
        </TopServicesCard>

        <AppointmentStatusCard>
          <h2>Status dos Agendamentos</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={appointmentStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={40}
                paddingAngle={4}
                label
              >
                {appointmentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
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
