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
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import ConsultaService from '../../services/consulta.service';

// Styled components para o calendário
const CalendarView = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
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
  margin: 0;
`;

const CalendarNav = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  width: 32px;
  height: 32px;
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
  border: 1px solid ${props => props.hasEvents ? '#2196f3' : '#ecf0f1'};
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 80px;
  position: relative;
  cursor: ${props => props.isCurrentMonth && props.hasEvents ? 'pointer' : 'default'};

  .day-number {
    font-weight: ${props => props.isToday ? '600' : '400'};
    color: ${props => props.isOutsideMonth ? '#bdc3c7' : '#2c3e50'};
  }

  &:hover {
    border-color: ${props => props.hasEvents ? '#2196f3' : '#ecf0f1'};
    background-color: ${props => props.hasEvents ? '#f5f5f5' : 'inherit'};
  }
`;

const EventIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  font-size: 0.7rem;
  color: #2196f3;

  .event-dot {
    width: 6px;
    height: 6px;
    background-color: #2196f3;
    border-radius: 50%;
    margin-right: 4px;
  }

  .event-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }
`;

const ConsultasDetalhes = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
`;

function MedicoHistoricoPage() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(0); // 0 = calendário, 1 = lista
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [consultasDoDia, setConsultasDoDia] = useState([]);

  useEffect(() => {
    loadConsultasConcluidasMedico();
  }, []);

  const loadConsultasConcluidasMedico = async () => {
    try {
      setLoading(true);
      const consultasResponse = await ConsultaService.getConsultasConcluidas();

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

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysFromPrevMonth = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const allDays = [];

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      allDays.push({
        date: day,
        isCurrentMonth: false,
        isToday: isSameDay(day, new Date())
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      allDays.push({
        date: day,
        isCurrentMonth: true,
        isToday: isSameDay(day, new Date())
      });
    }

    const daysNeeded = 42 - allDays.length;
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

  const getConsultasDodia = (date) => {
    return consultas.filter(consulta =>
      isSameDay(new Date(consulta.data_hora), date)
    );
  };

  const handleDayClick = (day) => {
    if (!day.isCurrentMonth) return;

    const consultasDia = getConsultasDodia(day.date);
    setSelectedDate(day.date);
    setConsultasDoDia(consultasDia);
    setView(1); // Muda para a visualização de lista
  };

  const handleTabChange = (event, newValue) => {
    setView(newValue);
    if (newValue === 0) {
      setSelectedDate(null); // Limpa seleção ao voltar ao calendário
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Histórico de Consultas Concluídas
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={view} onChange={handleTabChange}>
          <Tab label="Calendário" />
          <Tab label="Lista" />
        </Tabs>
      </Box>

      <Button
        onClick={loadConsultasConcluidasMedico}
        variant="contained"
        sx={{ marginBottom: '1rem' }}
      >
        Atualizar Histórico
      </Button>

      {loading ? (
        <p>Carregando histórico...</p>
      ) : consultas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Nenhuma consulta concluída encontrada.</p>
          <small>Quando você finalizar consultas, elas aparecerão aqui.</small>
        </div>
      ) : (
        <>
          {view === 0 ? (
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

                {getDaysInMonth().map((day, index) => {
                  const consultasDia = getConsultasDodia(day.date);
                  const hasEvents = consultasDia.length > 0;

                  return (
                    <Day
                      key={index}
                      isToday={day.isToday}
                      isOutsideMonth={!day.isCurrentMonth}
                      isCurrentMonth={day.isCurrentMonth}
                      hasEvents={hasEvents}
                      onClick={() => handleDayClick(day)}
                    >
                      <div className="day-number">{day.date.getDate()}</div>
                      {hasEvents && (
                        <EventIndicator>
                          <div className="event-dot"></div>
                          <span className="event-text">
                            {consultasDia.length} consulta{consultasDia.length > 1 ? 's' : ''}
                          </span>
                        </EventIndicator>
                      )}
                    </Day>
                  );
                })}
              </DaysGrid>
            </CalendarView>
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
    </Box>
  );
}

export default MedicoHistoricoPage;
