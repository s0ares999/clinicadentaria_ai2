import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import UtilizadorService from '../../services/utilizador.service';

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
  margin-left: auto;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
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

function AdminUtilizadoresPage() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [filteredUtilizadores, setFilteredUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUtilizador, setCurrentUtilizador] = useState(null);

  useEffect(() => {
    fetchUtilizadores();
  }, []);

  useEffect(() => {
    filterUtilizadores();
  }, [utilizadores, activeFilter, searchTerm]);

  const fetchUtilizadores = async () => {
    try {
      setLoading(true);
      const response = await UtilizadorService.getAllUtilizadores();
      setUtilizadores(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar utilizadores:', error);
      toast.error('Erro ao carregar lista de utilizadores');
      setLoading(false);
    }
  };

  const filterUtilizadores = () => {
    let filtered = [...utilizadores];
    
    // Filtrar por tipo
    if (activeFilter !== 'todos') {
      filtered = filtered.filter(
        utilizador => utilizador.tipoUtilizador?.nome.toLowerCase() === activeFilter
      );
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        utilizador => 
          utilizador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          utilizador.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUtilizadores(filtered);
  };

  const handleViewUtilizador = (utilizador) => {
    setCurrentUtilizador(utilizador);
    setShowModal(true);
  };

  const handleEditUtilizador = (utilizador) => {
    setCurrentUtilizador(utilizador);
    setShowModal(true);
  };

  const handleDeleteUtilizador = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este utilizador?')) {
      try {
        await UtilizadorService.deleteUtilizador(id);
        toast.success('Utilizador excluído com sucesso');
        fetchUtilizadores();
      } catch (error) {
        console.error('Erro ao excluir utilizador:', error);
        toast.error('Erro ao excluir utilizador');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await UtilizadorService.updateUtilizador(currentUtilizador.id, currentUtilizador);
      toast.success('Utilizador atualizado com sucesso');
      setShowModal(false);
      fetchUtilizadores();
    } catch (error) {
      console.error('Erro ao atualizar utilizador:', error);
      toast.error('Erro ao atualizar utilizador');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUtilizador(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Title>Gerenciar Usuários</Title>
      
      <FilterContainer>
        <FilterButton 
          active={activeFilter === 'todos'} 
          onClick={() => setActiveFilter('todos')}
        >
          Todos
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'cliente'} 
          onClick={() => setActiveFilter('cliente')}
        >
          Clientes
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'medico'} 
          onClick={() => setActiveFilter('medico')}
        >
          Médicos
        </FilterButton>
        <FilterButton 
          active={activeFilter === 'admin'} 
          onClick={() => setActiveFilter('admin')}
        >
          Administradores
        </FilterButton>
        
        <SearchInput 
          type="text" 
          placeholder="Buscar usuário..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FilterContainer>
      
      {loading ? (
        <EmptyMessage>Carregando utilizadores...</EmptyMessage>
      ) : (
        filteredUtilizadores.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUtilizadores.map(utilizador => (
                <tr key={utilizador.id}>
                  <td>{utilizador.nome}</td>
                  <td>{utilizador.email}</td>
                  <td>{utilizador.telefone || '-'}</td>
                  <td>{utilizador.tipoUtilizador?.nome || '-'}</td>
                  <td>
                    <ActionButton 
                      onClick={() => handleViewUtilizador(utilizador)}
                      title="Ver detalhes"
                    >
                      <FaEye />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => handleEditUtilizador(utilizador)}
                      title="Editar"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton 
                      color="#e74c3c"
                      hoverColor="#c0392b"
                      onClick={() => handleDeleteUtilizador(utilizador.id)}
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
          <EmptyMessage>Nenhum utilizador encontrado</EmptyMessage>
        )
      )}
      
      {showModal && currentUtilizador && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>Detalhes do Utilizador</h3>
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
                  value={currentUtilizador.nome}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={currentUtilizador.email}
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
                  value={currentUtilizador.telefone || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="tipoUtilizador">Tipo de Utilizador</Label>
                <Input
                  type="text"
                  id="tipoUtilizador"
                  value={currentUtilizador.tipoUtilizador?.nome || ''}
                  disabled
                />
              </FormGroup>
              
              {currentUtilizador.tipoUtilizador?.nome === 'admin' && (
                <FormGroup>
                  <Label htmlFor="nivelAcesso">Nível de Acesso</Label>
                  <Select
                    id="nivelAcesso"
                    name="nivelAcesso"
                    value={currentUtilizador.admin?.nivel_acesso || 'geral'}
                    onChange={handleInputChange}
                  >
                    <option value="geral">Geral</option>
                    <option value="total">Total</option>
                    <option value="restrito">Restrito</option>
                  </Select>
                </FormGroup>
              )}
              
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

export default AdminUtilizadoresPage; 