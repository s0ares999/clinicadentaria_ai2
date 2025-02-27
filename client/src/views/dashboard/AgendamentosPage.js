import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#e1e5e8'};
  }
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  i {
    margin-right: 8px;
  }
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  color: #7f8c8d;
  padding: 10px;
`;

const DayCell = styled.div`
  border: 1px solid #e1e5e8;
  min-height: 100px;
  padding: 10px;
  background-color: ${props => props.isToday ? '#f8f9fa' : 'white'};
  border-radius: 4px;

  .day-number {
    font-weight: ${props => props.isToday ? '600' : 'normal'};
    color: ${props => props.isToday ? '#3498db' : '#2c3e50'};
    margin-bottom: 10px;
  }

  &.other-month {
    opacity: 0.5;
  }
`;

const Appointment = styled.div`
  background-color: #3498db;
  color: white;
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &.confirmed {
    background-color: #2ecc71;
  }

  &.pending {
    background-color: #f39c12;
  }

  &.canceled {
    background-color: #e74c3c;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #e1e5e8;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .appointment-info {
    display: flex;
    align-items: center;
    gap: 15px;

    .time {
      font-weight: 600;
      min-width: 80px;
    }

    .details {
      .name {
        font-weight: 500;
        margin-bottom: 5px;
      }

      .service {
        font-size: 0.85rem;
        color: #7f8c8d;
      }
    }
  }

  .status {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    
    &.confirmed {
      background-color: #2ecc71;
      color: white;
    }
    
    &.pending {
      background-color: #f39c12;
      color: white;
    }
    
    &.canceled {
      background-color: #e74c3c;
      color: white;
    }
  }

  .actions {
    display: flex;
    gap: 5px;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#3498db'};
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.hoverColor || '#2980b9'};
  }
`;

const DateNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .nav-buttons {
    display: flex;
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e1e5e8;
  }

  &.today {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const API_URL = 'http://localhost:5000/api';

const AgendamentosPage = () => {
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgendamentos();
  }, [currentDate]);

  const fetchAgendamentos = async () => {
    try {
      setLoading(true);
      // Formatar a data para YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      
      const response = await axios.get(`${API_URL}/agendamentos`, { 
        headers: authHeader(),
        params: { 
          year,
          month
        }
      });
      
      setAgendamentos(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching agendamentos:', error);
      setLoading(false);
      // Adicionar notificação de erro quando tivermos react-toastify
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const today = new Date();
    const isToday = (day) => {
      return day === today.getDate() && 
             month === today.getMonth() && 
             year === today.getFullYear();
    };
    
    // Dias do mês anterior para preencher o início do calendário
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
      day: daysInPrevMonth - firstDayOfMonth + i + 1,
      isCurrentMonth: false,
      isPrevMonth: true
    }));
    
    // Dias do mês atual
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
      isToday: isToday(i + 1)
    }));
    
    // Dias do próximo mês para preencher o final do calendário
    const totalDaysDisplayed = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const nextMonthDays = Array.from(
      { length: totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length) }, 
      (_, i) => ({
        day: i + 1,
        isCurrentMonth: false,
        isNextMonth: true
      })
    );
    
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    
    // Filtrar agendamentos para o dia específico
    const getAppointmentsForDay = (day, isCurrentMonth) => {
      if (!isCurrentMonth) return [];
      
      return agendamentos.filter(appointment => {
        const appointmentDate = new Date(appointment.dataHora);
        return appointmentDate.getDate() === day && 
               appointmentDate.getMonth() === month && 
               appointmentDate.getFullYear() === year;
      });
    };
    
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
      <>
        <DateNavigation>
          <h2>{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
          <div className="nav-buttons">
            <NavButton onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}>
              <i className="fas fa-chevron-left"></i> Mês Anterior
            </NavButton>
            <NavButton className="today" onClick={() => setCurrentDate(new Date())}>
              Hoje
            </NavButton>
            <NavButton onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}>
              Próximo Mês <i className="fas fa-chevron-right"></i>
            </NavButton>
          </div>
        </DateNavigation>
        
        <CalendarContainer>
          {weekdays.map(day => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}
          
          {allDays.map((day, index) => {
            const appointments = getAppointmentsForDay(day.day, day.isCurrentMonth);
            
            return (
              <DayCell 
                key={index} 
                isToday={day.isToday}
                className={!day.isCurrentMonth ? 'other-month' : ''}
              >
                <div className="day-number">{day.day}</div>
                {appointments.map(appointment => (
                  <Appointment 
                    key={appointment.id}
                    className={appointment.estado.toLowerCase()}
                  >
                    {new Date(appointment.dataHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {appointment.cliente?.nome || 'Cliente'}
                  </Appointment>
                ))}
              </DayCell>
            );
          })}
        </CalendarContainer>
      </>
    );
  };

  const renderList = () => {
    // Filtrar agendamentos para a data selecionada
    const filteredAppointments = agendamentos.filter(appointment => {
      const appointmentDate = new Date(appointment.dataHora);
      return appointmentDate.getDate() === currentDate.getDate() && 
             appointmentDate.getMonth() === currentDate.getMonth() && 
             appointmentDate.getFullYear() === currentDate.getFullYear();
    });
    
    // Ordenar por hora
    filteredAppointments.sort((a, b) => {
      return new Date(a.dataHora) - new Date(b.dataHora);
    });
    
    return (
      <>
        <DateNavigation>
          <h2>{currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
          <div className="nav-buttons">
            <NavButton onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 1);
              setCurrentDate(newDate);
            }}>
              <i className="fas fa-chevron-left"></i> Dia Anterior
            </NavButton>
            <NavButton className="today" onClick={() => setCurrentDate(new Date())}>
              Hoje
            </NavButton>
            <NavButton onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() + 1);
              setCurrentDate(newDate);
            }}>
              Próximo Dia <i className="fas fa-chevron-right"></i>
            </NavButton>
          </div>
        </DateNavigation>
        
        <ListContainer>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <AppointmentItem key={appointment.id}>
                <div className="appointment-info">
                  <div className="time">
                    {new Date(appointment.dataHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div className="details">
                    <div className="name">{appointment.cliente?.nome || 'Cliente não disponível'}</div>
                    <div className="service">{appointment.servico || 'Consulta Geral'}</div>
                  </div>
                </div>
                <div className="status-and-actions">
                  <span className={`status ${appointment.estado.toLowerCase()}`}>
                    {appointment.estado}
                  </span>
                </div>
                <div className="actions">
                  <ActionButton onClick={() => handleConfirm(appointment.id)}>
                    <FaCheck color="#2ecc71" />
                  </ActionButton>
                  <ActionButton color="#e74c3c" hoverColor="#c0392b" onClick={() => handleReject(appointment.id)}>
                    <FaTimes />
                  </ActionButton>
                </div>
              </AppointmentItem>
            ))
          ) : (
            <p>Nenhum agendamento para este dia.</p>
          )}
        </ListContainer>
      </>
    );
  };

  // Funções para lidar com a confirmação e rejeição
  const handleConfirm = async (id) => {
    try {
      await axios.put(`${API_URL}/agendamentos/${id}/confirmar`, { estado: 'Confirmado' }, { headers: authHeader() });
      fetchAgendamentos(); // Recarregar agendamentos após a confirmação
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${API_URL}/agendamentos/${id}/rejeitar`, { estado: 'Cancelado' }, { headers: authHeader() });
      fetchAgendamentos(); // Recarregar agendamentos após a rejeição
    } catch (error) {
      console.error('Erro ao rejeitar agendamento:', error);
    }
  };

  return (
    <>
      <PageTitle>Gestão de Agendamentos</PageTitle>
      
      <Card>
        <ControlBar>
          <ViewToggle>
            <ViewButton 
              active={view === 'calendar'} 
              onClick={() => setView('calendar')}
            >
              <i className="fas fa-calendar-alt"></i> Calendário
            </ViewButton>
            <ViewButton 
              active={view === 'list'} 
              onClick={() => setView('list')}
            >
              <i className="fas fa-list"></i> Lista
            </ViewButton>
          </ViewToggle>
          
          <AddButton>
            <i className="fas fa-plus"></i>
            Novo Agendamento
          </AddButton>
        </ControlBar>
        
        {loading ? (
          <p>Carregando...</p>
        ) : (
          view === 'calendar' ? renderCalendar() : renderList()
        )}
      </Card>
    </>
  );
};

export default AgendamentosPage;
