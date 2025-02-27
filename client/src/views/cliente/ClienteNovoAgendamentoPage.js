import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import authHeader from '../../services/auth-header';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ScheduleContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / -1;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.secondary ? '#ecf0f1' : props.danger ? '#e74c3c' : '#3498db'};
  color: ${props => props.secondary ? '#2c3e50' : 'white'};
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.secondary ? '#dfe6e9' : props.danger ? '#c0392b' : '#2980b9'};
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  & + & {
    margin-left: 1rem;
  }
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  grid-column: 1 / -1;
  
  p {
    margin: 0;
    color: #2c3e50;
  }
`;

function ClienteNovoAgendamentoPage() {
  const [formData, setFormData] = useState({
    dataHora: '',
    servico: '',
    observacoes: '',
    hora: ''
  });
  const [servicos, setServicos] = useState([
    'Consulta Geral',
    'Limpeza Dentária',
    'Tratamento de Canal',
    'Extração',
    'Implante Dentário',
    'Ortodontia',
    'Clareamento Dental',
    'Prótese Dentária'
  ]);
  const [horarios, setHorarios] = useState([]);
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se o usuário está autenticado
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User data from localStorage:', user);
    
    if (!user || !user.accessToken) {
      navigate('/login');
      return;
    }
    
    // Carregar serviços disponíveis
    loadServicos();
  }, [navigate]);

  useEffect(() => {
    if (dataAgendamento) {
      gerarHorariosDisponiveis(dataAgendamento);
    }
  }, [dataAgendamento]);

  const loadServicos = async () => {
    try {
      // Em um cenário real, buscaríamos os serviços da API
      // Por enquanto, usamos os serviços definidos estaticamente
      console.log('Serviços carregados:', servicos);
      // Se quisermos buscar da API no futuro:
      // const response = await axios.get(`${API_URL}/servicos`, { headers: authHeader() });
      // setServicos(response.data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      toast.error('Erro ao carregar serviços disponíveis');
    }
  };

  const gerarHorariosDisponiveis = async (data) => {
    try {
      // Em um cenário real, buscaríamos os horários disponíveis da API
      // Por enquanto, vamos gerar horários fictícios
      const horariosDisponiveis = [];
      const dataObj = new Date(data);
      
      // Verificar se é fim de semana
      const diaSemana = dataObj.getDay();
      if (diaSemana === 0 || diaSemana === 6) {
        // Sábado ou domingo
        for (let hora = 9; hora <= 12; hora++) {
          horariosDisponiveis.push(`${hora}:00`);
          if (hora < 12) horariosDisponiveis.push(`${hora}:30`);
        }
      } else {
        // Dia de semana
        for (let hora = 9; hora <= 18; hora++) {
          if (hora !== 13) { // Excluir horário de almoço
            horariosDisponiveis.push(`${hora}:00`);
            if (hora < 18) horariosDisponiveis.push(`${hora}:30`);
          }
        }
      }
      
      // Em um cenário real, verificaríamos quais horários já estão ocupados
      // e os removeríamos da lista
      setHorarios(horariosDisponiveis);
    } catch (error) {
      console.error('Erro ao gerar horários disponíveis:', error);
      toast.error('Erro ao carregar horários disponíveis');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'data') {
      setDataAgendamento(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dataAgendamento || !formData.hora || !formData.servico) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Combinar data e hora
      const dataHora = new Date(`${dataAgendamento}T${formData.hora}`);
      
      const agendamentoData = {
        dataHora: dataHora.toISOString(),
        servico: formData.servico,
        observacoes: formData.observacoes,
        estado: 'Pendente'
      };
      
      console.log('Enviando agendamento:', agendamentoData);
      console.log('Headers:', authHeader());
      
      try {
        const response = await axios.post(
          `${API_URL}/agendamentos`, 
          agendamentoData,
          { 
            headers: authHeader(),
            timeout: 10000 // Adicionar timeout de 10 segundos
          }
        );
        
        console.log('Resposta do servidor:', response.data);
        
        toast.success('Consulta agendada com sucesso!');
        
        // Limpar formulário
        setFormData({
          dataHora: '',
          servico: '',
          observacoes: '',
          hora: ''
        });
        setDataAgendamento('');
        
        // Redirecionar para a página de agendamentos
        navigate('/cliente-dashboard/agendamentos');
      } catch (axiosError) {
        console.error('Erro do Axios:', axiosError);
        if (axiosError.response) {
          console.error('Resposta de erro:', axiosError.response.data);
          toast.error(`Erro ao agendar consulta: ${axiosError.response.data.message || 'Erro desconhecido'}`);
        } else if (axiosError.request) {
          console.error('Sem resposta:', axiosError.request);
          toast.error('Erro ao conectar com o servidor. Verifique sua conexão.');
        } else {
          console.error('Erro de configuração:', axiosError.message);
          toast.error(`Erro ao configurar requisição: ${axiosError.message}`);
        }
      }
      
      setSubmitting(false);
    } catch (error) {
      console.error('Erro geral ao agendar consulta:', error);
      toast.error('Erro ao agendar consulta. Por favor, tente novamente.');
      setSubmitting(false);
    }
  };

  // Calcular a data mínima (hoje)
  const today = new Date().toISOString().split('T')[0];
  
  // Calcular a data máxima (3 meses a partir de hoje)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <Container>
      <ScheduleContainer>
        <SectionTitle>Agendar Nova Consulta</SectionTitle>
        
        <InfoBox>
          <p>Selecione a data, horário e o serviço desejado para agendar sua consulta. Após o agendamento, nossa equipe entrará em contato para confirmar.</p>
        </InfoBox>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="data">Data *</Label>
            <Input 
              type="date" 
              id="data" 
              name="data"
              value={dataAgendamento}
              onChange={handleInputChange}
              min={today}
              max={maxDateString}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="hora">Horário *</Label>
            <Select 
              id="hora" 
              name="hora"
              value={formData.hora || ''}
              onChange={handleInputChange}
              required
              disabled={!dataAgendamento}
            >
              <option value="">Selecione um horário</option>
              {horarios.map(horario => (
                <option key={horario} value={horario}>
                  {horario}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="servico">Serviço *</Label>
            <Select 
              id="servico" 
              name="servico"
              value={formData.servico}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um serviço</option>
              {servicos.map(servico => (
                <option key={servico} value={servico}>
                  {servico}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label htmlFor="observacoes">Observações</Label>
            <TextArea 
              id="observacoes" 
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              placeholder="Descreva qualquer informação adicional relevante para a consulta"
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button type="button" secondary onClick={() => navigate('/cliente-dashboard/agendamentos')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Agendando...' : 'Agendar Consulta'}
            </Button>
          </ButtonGroup>
        </Form>
      </ScheduleContainer>
    </Container>
  );
}

export default ClienteNovoAgendamentoPage;
