import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Tab,
  Tabs
} from '@mui/material';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import ConsultaService from '../../services/consulta.service';

// Styled components similares ao AgendamentosPage
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

const TabButton = styled.button`
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
  border: 1px solid ${props => props.hasEvents ? '#2ecc71' : '#ecf0f1'};
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 80px;
  position: relative;
  
  .day-number {
    font-weight: ${props => props.isToday ? '600' : '400'};
    color: ${props => props.isOutsideMonth ? '#bdc3c7' : '#2c3e50'};
  }
  
  &:hover {
    border-color: ${props => props.hasEvents ? '#27ae60' : '#3498db'};
  }
`;

const EventIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-size: 0.75rem;
  color: #2ecc71;
  
  .event-dot {
    width: 8px;
    height: 8px;
    background-color: #2ecc71;
    border-radius: 50%;
    margin-right: 4px;
  }
  
  .event-text {
    white-space: nowrap;
    font-weight: 500;
  }
`;

const Status = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: #e8f5e9;
  color: #388e3c;
`;

function MedicoHistoricoPage() {
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [consultasDoDia, setConsultasDoDia] = useState([]);
  const [loadingDia, setLoadingDia] = useState(false);

  useEffect(() => {
    loadConsultasConcluidasMedico();
  }, []);

  const fetchConsultasDoDia = async (date) => {
    try {
      setLoadingDia(true);

      // Formatando data para yyyy-mm-dd
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;

      // Filtrar consultas concluídas do dia específico
      const consultasDoDiaFiltradas = consultas.filter(consulta => {
        const consultaDate = new Date(consulta.data_hora);
        const consultaDateString = `${consultaDate.getFullYear()}-${String(consultaDate.getMonth() + 1).padStart(2, '0')}-${String(consultaDate.getDate()).padStart(2, '0')}`;
        return consultaDateString === dateString;
      });

      // Para cada consulta do dia, verifica se tem fatura
      const consultasComFatura = await Promise.all(
        consultasDoDiaFiltradas.map(async (consulta) => {
          try {
            const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
            return {
              ...consulta,
              tem_fatura: !!fatura?.id
            };
          } catch {
            return { ...consulta, tem_fatura: false };
          }
        })
      );

      setConsultasDoDia(consultasComFatura);
    } catch (error) {
      console.error('Erro ao carregar consultas do dia:', error);
      toast.error('Erro ao carregar consultas do dia');
    } finally {
      setLoadingDia(false);
    }
  };

  const loadConsultasConcluidasMedico = async () => {
    try {
      setLoading(true);
      const consultasResponse = await ConsultaService.getConsultasConcluidas();

      // Para cada consulta, verifica se tem fatura
      const consultasComFatura = await Promise.all(
        (consultasResponse || []).map(async (consulta) => {
          try {
            const fatura = await ConsultaService.getFaturaFromConsulta(consulta.id);
            return {
              ...consulta,
              tem_fatura: !!fatura?.id
            };
          } catch {
            return { ...consulta, tem_fatura: false };
          }
        })
      );

      setConsultas(consultasComFatura);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar histórico de consultas concluídas:', error);
      toast.error('Erro ao carregar histórico de consultas concluídas');
      setConsultas([]);
      setLoading(false);
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

  const hasConsultasNoDia = (date) => {
    return consultas.some(consulta =>
      isSameDay(new Date(consulta.data_hora), date)
    );
  };

  const getQuantidadeConsultasNoDia = (date) => {
    return consultas.filter(consulta =>
      isSameDay(new Date(consulta.data_hora), date)
    ).length;
  };

  return (
    <Container>
      <Header>
        <Title>Histórico de Consultas Concluídas</Title>
        <TabsContainer>
          <TabButton
            active={view === 'calendar'}
            onClick={() => setView('calendar')}
          >
            Calendário
          </TabButton>
          <TabButton
            active={view === 'list'}
            onClick={() => setView('list')}
          >
            Lista
          </TabButton>
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
                hasEvents={hasConsultasNoDia(day.date)}
                onClick={() => {
                  if (day.isCurrentMonth && hasConsultasNoDia(day.date)) {
                    setSelectedDate(day.date);
                    fetchConsultasDoDia(day.date);
                    setView('list');
                  }
                }}
                style={{ 
                  cursor: day.isCurrentMonth && hasConsultasNoDia(day.date) ? 'pointer' : 'default' 
                }}
              >
                <div className="day-number">
                  {day.date.getDate()}
                  {hasConsultasNoDia(day.date) && (
                    <EventIndicator>
                      <div className="event-dot"></div>
                      <span className="event-text">
                        {getQuantidadeConsultasNoDia(day.date)} consulta{getQuantidadeConsultasNoDia(day.date) > 1 ? 's' : ''}
                      </span>
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
                Consultas Concluídas do dia {selectedDate.toLocaleDateString('pt-PT')}
              </h3>
              {loadingDia ? (
                <p>Carregando consultas deste dia...</p>
              ) : consultasDoDia.length > 0 ? (
                <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Hora</TableCell>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Observações</TableCell>
                        <TableCell>Fatura</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {consultasDoDia.map(consulta => (
                        <TableRow key={consulta.id}>
                          <TableCell>
                            {new Date(consulta.data_hora).toLocaleTimeString('pt-PT', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                          <TableCell>{consulta.utilizador?.nome || 'Paciente não identificado'}</TableCell>
                          <TableCell style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            {consulta.observacoes || 'Sem observações'}
                          </TableCell>
                          <TableCell>
                            {consulta.tem_fatura ? (
                              <span style={{ color: 'green', fontWeight: 'bold' }}>Emitida</span>
                            ) : (
                              <span style={{ color: '#777' }}>Não emitida</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>Nenhuma consulta concluída para este dia.</p>
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
                    ? `Consultas Concluídas do dia ${selectedDate.toLocaleDateString('pt-PT')}`
                    : 'Todas as Consultas Concluídas'}
                </h3>
                {selectedDate && (
                  <Button
                    onClick={() => {
                      setSelectedDate(null);
                      setConsultasDoDia([]);
                    }}
                    variant="outlined"
                    size="small"
                  >
                    Ver Todas
                  </Button>
                )}
              </div>

              <Button
                onClick={loadConsultasConcluidasMedico}
                variant="contained"
                sx={{ marginBottom: '1rem' }}
              >
                Atualizar Histórico
              </Button>

              {(selectedDate ? consultasDoDia : consultas).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Nenhuma consulta concluída encontrada{selectedDate ? ' para este dia' : ''}.</p>
                  <small>Quando você finalizar consultas, elas aparecerão aqui.</small>
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Data/Hora</TableCell>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Observações</TableCell>
                        <TableCell>Fatura</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(selectedDate ? consultasDoDia : consultas).map((consulta) => (
                        <TableRow key={consulta.id}>
                          <TableCell>{new Date(consulta.data_hora).toLocaleString('pt-PT')}</TableCell>
                          <TableCell>{consulta.utilizador?.nome || 'Paciente não identificado'}</TableCell>
                          <TableCell style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            {consulta.observacoes || 'Sem observações'}
                          </TableCell>
                          <TableCell>
                            {consulta.tem_fatura ? (
                              <span style={{ color: 'green', fontWeight: 'bold' }}>Emitida</span>
                            ) : (
                              <span style={{ color: '#777' }}>Não emitida</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </ListView>
      )}
    </Container>
  );
}

export default MedicoHistoricoPage;