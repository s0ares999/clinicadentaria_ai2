import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FaturaService from '../../../services/fatura.service'; // ajusta o caminho conforme sua estrutura

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

const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const ModalButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: #7f8c8d;

  &:hover {
    background-color: #606f7b;
  }
`;

const GestaoServicosPage = () => {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // ou 'edit'
    const [currentServico, setCurrentServico] = useState({
        id: null,
        nome: '',
        descricao: '',
        preco: ''
    });

    useEffect(() => {
        fetchServicos();
    }, []);

    const fetchServicos = async () => {
        try {
            setLoading(true);
            const response = await FaturaService.getServicosAtivos();
            setServicos(response || []);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredServicos = servicos.filter(servico =>
        servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (servico.descricao && servico.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Abrir modal para novo serviço
    const openCreateModal = () => {
        setModalMode('create');
        setCurrentServico({ id: null, nome: '', descricao: '', preco: '' });
        setModalOpen(true);
    };

    // Abrir modal para editar serviço
    const openEditModal = (servico) => {
        setModalMode('edit');
        setCurrentServico({
            id: servico.id,
            nome: servico.nome,
            descricao: servico.descricao || '',
            preco: servico.preco ? servico.preco.toString() : ''
        });
        setModalOpen(true);
    };

    // Fechar modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Atualiza os campos do formulário no modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentServico(prev => ({ ...prev, [name]: value }));
    };

    // Salvar serviço (criar ou editar)
    const handleSave = async () => {
        try {
            const dados = {
                nome: currentServico.nome.trim(),
                descricao: currentServico.descricao.trim(),
                preco: parseFloat(currentServico.preco)
            };

            if (!dados.nome || isNaN(dados.preco)) {
                alert('Nome e preço válidos são obrigatórios.');
                return;
            }

            if (modalMode === 'create') {
                await FaturaService.criarServico(dados);
            } else {
                await FaturaService.editarServico(currentServico.id, dados);
            }

            await fetchServicos();
            closeModal();
        } catch (error) {
            console.error('Erro ao salvar serviço:', error);
            alert('Erro ao salvar serviço. Veja o console para detalhes.');
        }
    };

    // Deletar serviço
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este serviço?')) {
            try {
                await FaturaService.deletarServico(id);
                await fetchServicos();
            } catch (error) {
                console.error('Erro ao deletar serviço:', error);
                alert('Erro ao deletar serviço. Veja o console para detalhes.');
            }
        }
    };

    return (
        <>
            <PageTitle>Gestão de Serviços</PageTitle>

            <Card>
                <SearchAndAddSection>
                    <SearchBar>
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Pesquisar serviços..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </SearchBar>

                    <AddButton onClick={openCreateModal}>
                        <i className="fas fa-plus"></i> Novo Serviço
                    </AddButton>
                </SearchAndAddSection>

                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Preço (€)</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServicos.length > 0 ? (
                                filteredServicos.map((servico) => (
                                    <tr key={servico.id}>
                                        <td>{servico.nome}</td>
                                        <td>{servico.descricao || '-'}</td>
                                        <td>
                                            {servico.preco != null && !isNaN(Number(servico.preco))
                                                ? Number(servico.preco).toFixed(2)
                                                : '-'}
                                        </td>
                                        <td>
                                            <ActionButton onClick={() => openEditModal(servico)}>
                                                <i className="fas fa-edit"></i>
                                            </ActionButton>
                                            <ActionButton color="#e74c3c" hoverColor="#c0392b" onClick={() => handleDelete(servico.id)}>
                                                <i className="fas fa-trash"></i>
                                            </ActionButton>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        Nenhum serviço encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </Card>

            {/* Modal */}
            {modalOpen && (
                <ModalBackground>
                    <ModalContent>
                        <h2>{modalMode === 'create' ? 'Novo Serviço' : 'Editar Serviço'}</h2>

                        <Input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={currentServico.nome}
                            onChange={handleChange}
                        />

                        <TextArea
                            name="descricao"
                            placeholder="Descrição"
                            rows={4}
                            value={currentServico.descricao}
                            onChange={handleChange}
                        />

                        <Input
                            type="number"
                            name="preco"
                            placeholder="Preço"
                            step="0.01"
                            min="0"
                            value={currentServico.preco}
                            onChange={handleChange}
                        />

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CancelButton onClick={closeModal}>Cancelar</CancelButton>
                            <ModalButton onClick={handleSave}>Salvar</ModalButton>
                        </div>
                    </ModalContent>
                </ModalBackground>
            )}
        </>
    );
};

export default GestaoServicosPage;
