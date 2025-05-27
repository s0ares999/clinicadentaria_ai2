import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import MedicoService from '../../services/medico.service';
import EspecialidadeService from '../../services/especialidade.service';


const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  th, td {
    padding: 1rem;
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
  background-color: transparent;
  color: ${props => props.color || '#3498db'};
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.1rem;
  
  &:hover {
    color: ${props => props.hoverColor || '#2980b9'};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &::placeholder {
    color: #95a5a6;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #2c3e50;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #95a5a6;
  
  &:hover {
    color: #7f8c8d;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const SubmitButton = styled.button`
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

const EmptyMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #95a5a6;
`;

function GestaoMedicosPage() {
  const [medicos, setMedicos] = useState([]);
  const [filteredMedicos, setFilteredMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentMedico, setCurrentMedico] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    fetchMedicos();
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    filterMedicos();
  }, [medicos, activeFilter, searchTerm]);

  const fetchEspecialidades = async () => {
    try {
      const response = await EspecialidadeService.getAllEspecialidades();
      console.log('Especialidades API:', response.data);
      
      // A correção principal está aqui - acessar response.data.data
      if (response.data && response.data.success && response.data.data) {
        setEspecialidades(response.data.data);
      } else {
        setEspecialidades([]);
      }
    } catch (error) {
      console.error('Erro ao carregar especialidades:', error);
      toast.error('Erro ao carregar especialidades');
      setEspecialidades([]);
    }
  };

  const fetchMedicos = async () => {
    try {
      setLoading(true);
      const response = await MedicoService.getAllMedicos();
      setMedicos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar médicos:', error);
      toast.error('Erro ao carregar lista de médicos');
      setLoading(false);
    }
  };

  const filterMedicos = () => {
    let filtered = [...medicos];

    // Filtrar por especialidade
    if (activeFilter !== 'todos') {
      filtered = filtered.filter(medico => {
        const especialidadeNome = medico.especialidade?.nome || medico.medico?.especialidade?.nome;
        return especialidadeNome?.toLowerCase() === activeFilter;
      });
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(medico => {
        const nome = (medico.nome || '').toLowerCase();
        const email = (medico.email || '').toLowerCase();
        
        const especialidade = (medico.especialidade?.nome || medico.medico?.especialidade?.nome || '').toLowerCase();
        
        return nome.includes(searchTermLower) ||
               email.includes(searchTermLower) ||
               
               especialidade.includes(searchTermLower);
      });
    }

    setFilteredMedicos(filtered);
  };

  const handleViewMedico = (medico) => {
    setCurrentMedico(medico);
    setShowModal(true);
  };

  const handleEditMedico = (medico) => {
    setCurrentMedico(medico);
    setShowModal(true);
  };

  const handleDeleteMedico = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await MedicoService.deleteMedico(id);
        toast.success('Médico excluído com sucesso');
        fetchMedicos();
      } catch (error) {
        console.error('Erro ao excluir médico:', error);
        toast.error('Erro ao excluir médico');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await MedicoService.updateMedico(currentMedico.id, currentMedico);
      toast.success('Médico atualizado com sucesso');
      setShowModal(false);
      fetchMedicos();
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
      toast.error('Erro ao atualizar médico');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedico(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Title>Gestão de Médicos</Title>

      <FilterContainer>
        <FilterButton
          active={activeFilter === 'todos'}
          onClick={() => setActiveFilter('todos')}
        >
          Todos
        </FilterButton>

        {Array.isArray(especialidades) && especialidades.length > 0 && especialidades.map((esp) => (
          <FilterButton
            key={esp.id}
            active={activeFilter === esp.nome.toLowerCase()}
            onClick={() => setActiveFilter(esp.nome.toLowerCase())}
          >
            {esp.nome}
          </FilterButton>
        ))}

        <div style={{ marginLeft: 'auto' }}>
          <SearchInput
            type="text"
            placeholder="Buscar por nome, emai, ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </FilterContainer>

      {loading ? (
        <EmptyMessage>Carregando médicos...</EmptyMessage>
      ) : (
        filteredMedicos.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                
                <th>Especialidade</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicos.map(medico => (
                <tr key={medico.id}>
                  <td>{medico.nome || '-'}</td>
                  
                  <td>{medico.especialidade?.nome || medico.medico?.especialidade?.nome || '-'}</td>
                  <td>{medico.email || '-'}</td>
                  <td>{medico.telefone || '-'}</td>
                  <td>
                    <ActionButton
                      onClick={() => handleViewMedico(medico)}
                      title="Ver detalhes"
                    >
                      <FaEye />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleEditMedico(medico)}
                      title="Editar"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      color="#e74c3c"
                      hoverColor="#c0392b"
                      onClick={() => handleDeleteMedico(medico.id)}
                      title="Excluir"
                    >
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyMessage>Nenhum médico encontrado</EmptyMessage>
        )
      )}

      {showModal && currentMedico && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>Detalhes do Médico</h3>
              <CloseButton onClick={() => setShowModal(false)}>
                &times;
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  type="text"
                  id="nome"
                  name="nome"
                  value={currentMedico.nome}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>


              <FormGroup>
                <Label htmlFor="especialidade">Especialidade</Label>
                <Select
                  id="especialidade"
                  name="especialidade"
                  value={currentMedico.especialidade}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma especialidade</option>
                  {especialidades.map((esp) => (
                    <option key={esp.id} value={esp.nome.toLowerCase()}>
                      {esp.nome}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={currentMedico.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={currentMedico.telefone || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={currentMedico.endereco || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="horarioAtendimento">Horário de Atendimento</Label>
                <Input
                  type="text"
                  id="horarioAtendimento"
                  name="horarioAtendimento"
                  value={currentMedico.horarioAtendimento || ''}
                  onChange={handleInputChange}
                  placeholder="Ex: 08:00 - 17:00"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="valorConsulta">Valor da Consulta</Label>
                <Input
                  type="number"
                  id="valorConsulta"
                  name="valorConsulta"
                  value={currentMedico.valorConsulta || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </FormGroup>

              <SubmitButton type="submit">
                Salvar Alterações
              </SubmitButton>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default GestaoMedicosPage;