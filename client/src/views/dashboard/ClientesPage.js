import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import api from '../../services/api.config';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

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

const SearchAndAddSection = styled.div`
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 15px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    border: none;
    background: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #2c3e50;
  }

  i {
    color: #7f8c8d;
    margin-right: 10px;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e1e5e8;
  }

  th {
    font-weight: 600;
    color: #7f8c8d;
    background-color: #f8f9fa;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#3498db'};
  cursor: pointer;
  margin-right: 10px;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.hoverColor || '#2980b9'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 5px;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : '#fff'};
  color: ${props => props.active ? '#fff' : '#2c3e50'};
  border: 1px solid #e1e5e8;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Modal components
const ModalBackground = styled.div`
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

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    transition: color 0.3s;

    &:hover {
      color: #2c3e50;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: 500;
    color: #2c3e50;
  }

  input, select, textarea {
    padding: 10px;
    border: 1px solid #e1e5e8;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #3498db;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &.cancel {
    background-color: #e1e5e8;
    color: #2c3e50;

    &:hover {
      background-color: #cfd5d9;
    }
  }

  &.save {
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  }

  &.delete {
    background-color: #e74c3c;
    color: white;

    &:hover {
      background-color: #c0392b;
    }
  }
`;

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    endereco: '',
    observacoes: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/dashboard');
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN');
  
  useEffect(() => {
    if (isAdminPage && !isAdmin) {
      navigate('/login');
    } else {
      fetchClientes();
    }
  }, [currentPage, isAdminPage, isAdmin, navigate]);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      
      const endpoint = isAdminPage ? 'clientes' : 'clientes/public';
      
      const response = await api.get(endpoint, { 
        params: { page: currentPage - 1, size: 10 }
      });
      
      if (response.data && response.data.items) {
        setClientes(response.data.items);
        setTotalPages(Math.ceil(response.data.total / 10));
      } else {
        setClientes([]);
        setTotalPages(1);
      }
      
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar clientes');
      setLoading(false);
      console.error('Error fetching clientes:', error);
      setClientes([]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implementar lógica de pesquisa quando tiver backend
  };

  const openModal = (cliente = null) => {
    if (cliente) {
      setFormData({
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        dataNascimento: cliente.dataNascimento ? cliente.dataNascimento.split('T')[0] : '',
        endereco: cliente.endereco,
        observacoes: cliente.observacoes || ''
      });
      setEditingCliente(cliente);
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        endereco: '',
        observacoes: ''
      });
      setEditingCliente(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCliente(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCliente) {
        await api.put(`clientes/${editingCliente.id}`, formData);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        await api.post('clientes', formData);
        toast.success('Cliente adicionado com sucesso!');
      }
      
      closeModal();
      fetchClientes();
    } catch (error) {
      toast.error('Erro ao salvar cliente');
      console.error('Error saving cliente:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este cliente?')) {
      try {
        await api.delete(`clientes/${id}`);
        toast.success('Cliente removido com sucesso!');
        fetchClientes();
      } catch (error) {
        toast.error('Erro ao remover cliente');
        console.error('Error deleting cliente:', error);
      }
    }
  };

  return (
    <>
      <PageTitle>Gestão de Clientes</PageTitle>
      
      <Card>
        <SearchAndAddSection>
          <SearchBar>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Pesquisar clientes..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          
          {isAdminPage && (
            <AddButton onClick={() => openModal()}>
              <i className="fas fa-plus"></i>
              Adicionar Cliente
            </AddButton>
          )}
        </SearchAndAddSection>
        
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Data de Nascimento</th>
                  {isAdminPage && (
                    <th>Ações</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {clientes.length > 0 ? (
                  clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.nome}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.telefone}</td>
                      <td>
                        {cliente.dataNascimento 
                          ? new Date(cliente.dataNascimento).toLocaleDateString() 
                          : '---'
                        }
                      </td>
                      {isAdminPage && (
                        <td>
                          <ActionButton onClick={() => openModal(cliente)}>
                            <i className="fas fa-edit"></i>
                          </ActionButton>
                          <ActionButton 
                            color="#e74c3c" 
                            hoverColor="#c0392b"
                            onClick={() => handleDelete(cliente.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </ActionButton>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isAdminPage ? 5 : 4} style={{ textAlign: 'center' }}>
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            
            <Pagination>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </PageButton>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PageButton 
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ))}
              
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-chevron-right"></i>
              </PageButton>
            </Pagination>
          </>
        )}
      </Card>

      {isModalOpen && isAdminPage && (
        <ModalBackground>
          <ModalContainer>
            <ModalHeader>
              <h2>{editingCliente ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
              <button onClick={closeModal}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="nome">Nome*</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="telefone">Telefone*</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button" className="cancel" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit" className="save">
                  {editingCliente ? 'Atualizar' : 'Salvar'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default ClientesPage;
