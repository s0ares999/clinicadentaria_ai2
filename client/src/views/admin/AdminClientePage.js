import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import ClienteService from '../../services/cliente.service';

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

function AdminClientePage() {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    filterClientes();
  }, [clientes, searchTerm]);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await ClienteService.getAllClientes();
      setClientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast.error('Erro ao carregar lista de clientes');
      setLoading(false);
    }
  };

  const filterClientes = () => {
    let filtered = [...clientes];
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(cliente => {
        const nome = (cliente.nome || '').toLowerCase();
        const email = (cliente.email || '').toLowerCase();
        const telefone = (cliente.telefone || '').toLowerCase();
        return nome.includes(searchTermLower) ||
               email.includes(searchTermLower) ||
               telefone.includes(searchTermLower);
      });
    }
    setFilteredClientes(filtered);
  };

  const handleViewCliente = (cliente) => {
    setCurrentCliente(cliente);
    setShowModal(true);
  };

  const handleEditCliente = (cliente) => {
    setCurrentCliente(cliente);
    setShowModal(true);
  };

  const handleDeleteCliente = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await ClienteService.deleteCliente(id);
        toast.success('Cliente excluído com sucesso');
        fetchClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        toast.error('Erro ao excluir cliente');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ClienteService.updateCliente(currentCliente.id, currentCliente);
      toast.success('Cliente atualizado com sucesso');
      setShowModal(false);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      toast.error('Erro ao atualizar cliente');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Title>Gestão de Clientes</Title>
      <FilterContainer>
        <div style={{ marginLeft: 'auto' }}>
          <SearchInput
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </FilterContainer>
      {loading ? (
        <EmptyMessage>Carregando clientes...</EmptyMessage>
      ) : (
        filteredClientes.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.nome || '-'}</td>
                  <td>{cliente.email || '-'}</td>
                  <td>{cliente.telefone || '-'}</td>
                  <td>
                    <ActionButton
                      onClick={() => handleViewCliente(cliente)}
                      title="Ver detalhes"
                    >
                      <FaEye />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleEditCliente(cliente)}
                      title="Editar"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      color="#e74c3c"
                      hoverColor="#c0392b"
                      onClick={() => handleDeleteCliente(cliente.id)}
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
          <EmptyMessage>Nenhum cliente encontrado</EmptyMessage>
        )
      )}
      {showModal && currentCliente && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>Detalhes do Cliente</h3>
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
                  value={currentCliente.nome}
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
                  value={currentCliente.email}
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
                  value={currentCliente.telefone || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={currentCliente.endereco || ''}
                  onChange={handleInputChange}
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

export default AdminClientePage;
