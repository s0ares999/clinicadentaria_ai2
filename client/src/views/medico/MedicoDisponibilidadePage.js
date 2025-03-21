import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import DisponibilidadeService from '../../services/disponibilidade.service';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
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
`;

const Button = styled.button`
  grid-column: 1 / -1;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const DisponibilidadesContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-top: 1.5rem;
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

const ActionButton = styled.button`
  background-color: ${props => props.color || '#e74c3c'};
  color: white;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.hoverColor || '#c0392b'};
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #95a5a6;
`;

function MedicoDisponibilidadePage() {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    fetchDisponibilidades();
  }, []);

  const fetchDisponibilidades = async () => {
    try {
      setLoading(true);
      const response = await DisponibilidadeService.getDisponibilidadesByMedico(currentUser.user.id);
      setDisponibilidades(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar disponibilidades:', error);
      toast.error('Erro ao carregar suas disponibilidades');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data || !horaInicio || !horaFim) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    if (horaInicio >= horaFim) {
      toast.error('A hora de início deve ser anterior à hora de fim');
      return;
    }
    
    try {
      setSubmitting(true);
      
      await DisponibilidadeService.createDisponibilidade({
        medico_id: currentUser.user.id,
        data,
        hora_inicio: horaInicio,
        hora_fim: horaFim,
        status_id: 1 // Assumindo que o ID 1 é para o status "Disponível"
      });
      
      toast.success('Disponibilidade adicionada com sucesso');
      
      // Limpar o formulário
      setData('');
      setHoraInicio('');
      setHoraFim('');
      
      // Atualizar a lista de disponibilidades
      fetchDisponibilidades();
      
      setSubmitting(false);
    } catch (error) {
      console.error('Erro ao adicionar disponibilidade:', error);
      toast.error('Erro ao adicionar disponibilidade');
      setSubmitting(false);
    }
  };

  const handleDeleteDisponibilidade = async (id) => {
    if (window.confirm('Tem certeza que deseja remover esta disponibilidade?')) {
      try {
        await DisponibilidadeService.deleteDisponibilidade(id);
        toast.success('Disponibilidade removida com sucesso');
        fetchDisponibilidades();
      } catch (error) {
        console.error('Erro ao remover disponibilidade:', error);
        toast.error('Erro ao remover disponibilidade');
      }
    }
  };

  return (
    <Container>
      <Title>Gerenciar Disponibilidade</Title>
      
      <FormContainer>
        <h3>Adicionar Nova Disponibilidade</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="data">Data</Label>
            <Input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="horaInicio">Hora de Início</Label>
            <Input
              type="time"
              id="horaInicio"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="horaFim">Hora de Fim</Label>
            <Input
              type="time"
              id="horaFim"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              required
            />
          </FormGroup>
          
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Adicionando...' : 'Adicionar Disponibilidade'}
          </Button>
        </Form>
      </FormContainer>
      
      <DisponibilidadesContainer>
        <h3>Minhas Disponibilidades</h3>
        
        {loading ? (
          <EmptyMessage>Carregando disponibilidades...</EmptyMessage>
        ) : (
          disponibilidades.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora de Início</th>
                  <th>Hora de Fim</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {disponibilidades.map(disponibilidade => (
                  <tr key={disponibilidade.id}>
                    <td>{new Date(disponibilidade.data).toLocaleDateString('pt-PT')}</td>
                    <td>{disponibilidade.hora_inicio}</td>
                    <td>{disponibilidade.hora_fim}</td>
                    <td>{disponibilidade.status?.nome || 'Disponível'}</td>
                    <td>
                      <ActionButton 
                        onClick={() => handleDeleteDisponibilidade(disponibilidade.id)}
                      >
                        Remover
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyMessage>Nenhuma disponibilidade registrada</EmptyMessage>
          )
        )}
      </DisponibilidadesContainer>
    </Container>
  );
}

export default MedicoDisponibilidadePage; 