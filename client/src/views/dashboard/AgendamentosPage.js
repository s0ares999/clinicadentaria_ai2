import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api.config';
import { toast } from 'react-toastify';
import ConsultaService from '../../services/consulta.service';

const API_URL = "http://localhost:8000/api";

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? '#3498db' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  }
`;

const CalendarView = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const ListView = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f8f9fa;
  }
`;

const Status = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &.agendada {
    background-color: #fff8e1;
    color: #ffa000;
  }
  
  &.confirmada {
    background-color: #e8f5e9;
    color: #388e3c;
  }
  
  &.finalizada {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  &.cancelada {
    background-color: #ffebee;
    color: #d32f2f;
  }
`;

const Button = styled.button`
  background-color: ${props => props.color || '#3498db'};
  color: white;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CalendarMonth = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
`;

const CalendarNav = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-weight: 500;
  color: #7f8c8d;
  padding: 0.5rem;
`;

const Day = styled.div`
  background-color: ${props => props.isToday ? '#e3f2fd' : props.isOutsideMonth ? '#f8f9fa' : 'white'};
  border: 1px solid ${props => props.hasEvents ? '#3498db' : '#ecf0f1'};
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 80px;
  position: relative;
  
  .day-number {
    font-weight: ${props => props.isToday ? '600' : '400'};
    color: ${props => props.isOutsideMonth ? '#bdc3c7' : '#2c3e50'};
  }
  
  &:hover {
    border-color: #3498db;
  }
`;

const EventDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #3498db;
  border-radius: 50%;
  display: inline-block;
  margin-left: 4px;
`;

const EventIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-size: 0.75rem;
  color: #3498db;
  
  .event-dot {
    width: 8px;
    height: 8px;
    background-color: #3498db;
    border-radius: 50%;
    margin-right: 4px;
  }
  
  .event-text {
    white-space: nowrap;
    font-weight: 500;
  }
`;

const AgendamentosPage = () => {
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [consultasDoDia, setConsultasDoDia] = useState([]);
  const [loadingDia, setLoadingDia] = useState(false);

  const statusClassMap = {
    'Agendada': 'agendada',
    'Confirmada': 'confirmada',
    'Finalizada': 'finalizada',
    'Cancelada': 'cancelada'
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultasDoDia = async (date) => {
    try {
      setLoadingDia(true);

      // Formatando data para yyyy-mm-dd, porque geralmente APIs filtram assim
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;

      // Aqui você pode chamar sua API passando a data pra filtrar
      // Vou usar api.get(`/consultas/confirmadas?date=${dateString}`) como exemplo,
      // mas adapte conforme seu backend.

      // Corrigido:
      const response = await api.get(`consultas/confirmadas?data=${dateString}`);


      setConsultasDoDia(response.data);
    } catch (error) {
      console.error('Erro ao carregar consultas do dia:', error);
      toast.error('Erro ao carregar consultas do dia');
    } finally {
      setLoadingDia(false);
    }
  };

  const fetchConsultas = async () => {
    try {
      setLoading(true);
      const response = await api.get('consultas/confirmadas');
      setConsultas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      setLoading(false);
      toast.error('Erro ao carregar consultas');
    }
  };

  const previousMonth = () => {
    setCurrentDate(date => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate(date => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      return newDate;
    });
  };

  const getMonthName = () => {
    return currentDate.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);

    // Dias do mês anterior para completar a primeira semana
    const daysFromPrevMonth = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    // Array para armazenar todos os dias a serem mostrados
    const allDays = [];

    // Adicionar dias do mês anterior
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      allDays.push({
        date: day,
        isCurrentMonth: false,
        isToday: isSameDay(day, new Date())
      });
    }

    // Adicionar dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      allDays.push({
        date: day,
        isCurrentMonth: true,
        isToday: isSameDay(day, new Date())
      });
    }

    // Adicionar dias do próximo mês para completar a última semana
    const daysNeeded = 42 - allDays.length; // 6 semanas * 7 dias = 42
    for (let i = 1; i <= daysNeeded; i++) {
      const day = new Date(year, month + 1, i);
      allDays.push({
        date: day,
        isCurrentMonth: false,
        isToday: isSameDay(day, new Date())
      });
    }

    return allDays;
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  const handleConfirmarConsulta = async (id) => {
    try {
      await ConsultaService.updateConsulta(id, { status_id: 2 }); // Assumindo que 2 é o ID do status "Confirmada"
      fetchConsultas(); // Recarregar consultas após a confirmação
    } catch (error) {
      console.error('Erro ao confirmar consulta:', error);
    }
  };

  const handleFinalizarConsulta = async (id) => {
    try {
      await ConsultaService.updateConsulta(id, { status_id: 3 }); // Assumindo que 3 é o ID do status "Finalizada"
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao finalizar consulta:', error);
    }
  };

  const handleCancelarConsulta = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
      try {
        await ConsultaService.cancelConsulta(id);
        fetchConsultas();
      } catch (error) {
        console.error('Erro ao cancelar consulta:', error);
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>Gestão de Consultas</Title>
        <TabsContainer>
          <Tab
            active={view === 'calendar'}
            onClick={() => setView('calendar')}
          >
            Calendário
          </Tab>
          <Tab
            active={view === 'list'}
            onClick={() => setView('list')}
          >
            Lista
          </Tab>
        </TabsContainer>
      </Header>

      {view === 'calendar' ? (
        <CalendarView>
          <CalendarHeader>
            <CalendarMonth>{getMonthName()}</CalendarMonth>
            <CalendarNav>
              <NavButton onClick={previousMonth}>&lt;</NavButton>
              <NavButton onClick={nextMonth}>&gt;</NavButton>
            </CalendarNav>
          </CalendarHeader>

          <DaysGrid>
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}

            {getDaysInMonth().map((day, index) => (
              <Day
                key={index}
                isToday={day.isToday}
                isOutsideMonth={!day.isCurrentMonth}
                hasEvents={consultas.some(consulta =>
                  isSameDay(new Date(consulta.data_hora), day.date)
                )}
                onClick={() => {
                  if (day.isCurrentMonth) {
                    setSelectedDate(day.date);
                    fetchConsultasDoDia(day.date);
                    setView('list'); // <- mudar para a aba de lista
                  }
                }}
                style={{ cursor: day.isCurrentMonth ? 'pointer' : 'default' }}
              >
                <div className="day-number">
                  {day.date.getDate()}
                  {consultas.some(consulta =>
                    isSameDay(new Date(consulta.data_hora), day.date)
                  ) && (
                      <EventIndicator>
                        <div className="event-dot"></div>
                        <span className="event-text">Ver Consultas do dia {day.date.getDate()}</span>
                      </EventIndicator>
                    )}
                </div>
              </Day>
            ))}
          </DaysGrid>

          {/* Mostrar consultas do dia clicado */}
          {selectedDate && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3>
                Consultas de {selectedDate.toLocaleDateString('pt-PT')}
              </h3>
              {loadingDia ? (
                <p>Carregando consultas deste dia...</p>
              ) : consultasDoDia.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Hora</th>
                      <th>Paciente</th>
                      <th>Médico</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultasDoDia.map(consulta => (
                      <tr key={consulta.id}>
                        <td>
                          {new Date(consulta.data_hora).toLocaleTimeString('pt-PT', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td>{consulta.cliente?.nome || 'Cliente'}</td>
                        <td>{consulta.medico?.nome || 'Médico'}</td>
                        <td>
                          <Status className={statusClassMap[consulta.status?.nome] || 'agendada'}>
                            {consulta.status?.nome || 'Agendada'}
                          </Status>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Nenhuma consulta confirmada para este dia.</p>
              )}
            </div>
          )}
        </CalendarView>
      ) : (
        <ListView>
          {loading || (selectedDate && loadingDia) ? (
            <p>Carregando consultas...</p>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>
                  {selectedDate
                    ? `Consultas de ${selectedDate.toLocaleDateString('pt-PT')}`
                    : 'Todas as Consultas'}
                </h3>
                {selectedDate && (
                  <Button onClick={() => setSelectedDate(null)}>
                    Ver todas as consultas
                  </Button>
                )}
              </div>

              <Table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedDate ? consultasDoDia : consultas).length > 0 ? (
                    (selectedDate ? consultasDoDia : consultas).map(consulta => (
                      <tr key={consulta.id}>
                        <td>
                          {new Date(consulta.data_hora).toLocaleDateString('pt-PT')}
                        </td>
                        <td>
                          {new Date(consulta.data_hora).toLocaleTimeString('pt-PT', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td>{consulta.utilizador?.nome || 'Cliente'}</td>
                        <td>{consulta.medico?.nome || 'Médico'}</td>
                        <td>
                          <Status className={statusClassMap[consulta.status?.nome] || 'agendada'}>
                            {consulta.status?.nome || 'Agendada'}
                          </Status>
                        </td>
                        <td>
                          {consulta.status?.nome === 'Agendada' && (
                            <>
                              <Button onClick={() => handleConfirmarConsulta(consulta.id)}>
                                Confirmar
                              </Button>
                              <Button
                                color="#e74c3c"
                                onClick={() => handleCancelarConsulta(consulta.id)}
                              >
                                Cancelar
                              </Button>
                            </>
                          )}
                          {consulta.status?.nome === 'Confirmada' && (
                            <>
                              <Button
                                color="#2ecc71"
                                onClick={() => handleFinalizarConsulta(consulta.id)}
                              >
                                Finalizar
                              </Button>
                              <Button
                                color="#e74c3c"
                                onClick={() => handleCancelarConsulta(consulta.id)}
                              >
                                Cancelar
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>
                        Nenhuma consulta {selectedDate ? 'para este dia' : 'encontrada'}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </ListView>

      )}
    </Container>
  );



};

export default AgendamentosPage;