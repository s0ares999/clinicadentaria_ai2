import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import MedicoService from '../../../services/medico.service';
import AuthService from '../../../services/auth.service';
import UtilizadorService from '../../../services/utilizador.service';

const ProfileSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  position: relative;
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  i {
    color: white;
    font-size: 1.5rem;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileInfo = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }
  
  p {
    margin: 0.25rem 0;
    color: #7f8c8d;
  }
  
  .email {
    margin-bottom: 0.75rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #dcdde1;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &:disabled {
    background-color: #f5f6fa;
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9;
  }
`;

function MedicoPerfilComponent() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    crm: '',
    biografia: '',
    foto_perfil: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadMedicoData();
  }, []);

  const loadMedicoData = async () => {
    try {
      setLoading(true);
      console.log("Iniciando carregamento do perfil do médico...");
      const user = AuthService.getCurrentUser();
      console.log("Usuário atual:", user);
      
      // Verificar se o token está presente
      if (!user || !user.accessToken) {
        console.error("Token não encontrado!");
        setError('Token de autenticação ausente');
        return;
      }
      
      try {
        const userId = user.id;
        console.log(`Buscando dados do médico com ID ${userId}`);
        
        const response = await MedicoService.getMedicoPerfil();
        console.log("Resposta da API:", response);
        
        // Verificar se temos dados e mapear adequadamente
        if (response && response.data && response.data.data) {
          const userData = response.data.data;
          console.log("Dados do utilizador:", userData);
          console.log("Dados do médico:", userData.medico);
          
          setFormData({
            nome: userData.nome || '',
            email: userData.email || '',
            telefone: userData.telefone || '',
            especialidade: userData.medico?.especialidade?.nome || 'Não informada',
            crm: userData.medico?.crm || 'Não informado',
            biografia: userData.medico?.biografia || '',
            foto_perfil: userData.foto_perfil || ''
          });
          
          console.log("Formulário atualizado com sucesso");
          return;
        } else {
          console.error("Resposta inválida da API:", response);
          throw new Error("Formato de resposta inválido");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do médico:", error);
        setError('Não foi possível carregar os dados do perfil');
        toast.error('Erro ao carregar dados do perfil');
      }
    } catch (error) {
      // Logar detalhes do erro
      console.error('Erro detalhado:', error.response || error);
      setError('Erro ao carregar dados do perfil');
      toast.error('Erro ao carregar dados do perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MedicoService.updateMedicoPerfil(formData);
      if (response.success) {
        toast.success('Perfil atualizado com sucesso!');
        // Recarregar os dados para exibir as alterações
        await loadMedicoData();
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      toast.error('Erro ao atualizar perfil');
    }
  };

  const handleAvatarClick = () => {
    // Ativar o input de arquivo quando clicar no avatar
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      const result = await UtilizadorService.uploadProfilePicture(file);
      
      // Atualizar o estado com a nova URL da imagem
      setFormData(prev => ({
        ...prev,
        foto_perfil: result.imageUrl
      }));
      
      toast.success('Foto de perfil atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast.error('Erro ao enviar a imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return <div>Carregando dados do perfil...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Obter as iniciais do nome para exibir no avatar
  const getInitials = (name) => {
    if (!name) return 'M';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // URL completa da imagem do servidor
  const getProfileImageUrl = () => {
    if (!formData.foto_perfil) return null;
    
    // Se já for uma URL completa, retornar
    if (formData.foto_perfil.startsWith('http')) {
      return formData.foto_perfil;
    }
    
    // Obter a URL base do backend e concatenar com o caminho da imagem
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    return `${baseUrl}${formData.foto_perfil}`;
  };

  return (
    <div>
      <ProfileSection>
        <ProfileHeader>
          <ProfileAvatar imageUrl={getProfileImageUrl()}>
            {!formData.foto_perfil && getInitials(formData.nome)}
            <AvatarOverlay onClick={handleAvatarClick}>
              <i className="fas fa-camera"></i>
            </AvatarOverlay>
            <HiddenFileInput 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*"
            />
          </ProfileAvatar>
          <ProfileInfo>
            <h3>Bem-vindo, Dr(a). {formData.nome}</h3>
            <p className="email">Email: {formData.email}</p>
            <p>CRM: {formData.crm}</p>
            <p>Especialidade: {formData.especialidade}</p>
          </ProfileInfo>
        </ProfileHeader>
      </ProfileSection>
      
      <h2>Informações Pessoais</h2>
      
      <ProfileSection>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome Completo</Label>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              disabled
            />
            <small>O email não pode ser alterado</small>
          </FormGroup>

          <FormGroup>
            <Label>Telefone</Label>
            <Input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>CRM</Label>
            <Input
              type="text"
              name="crm"
              value={formData.crm}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Especialidade</Label>
            <Input
              type="text"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
            />
          </FormGroup>

          <SaveButton type="submit">
            Guardar Alterações
          </SaveButton>
        </Form>
      </ProfileSection>
    </div>
  );
}

export default MedicoPerfilComponent; 