import React, { useEffect, useState } from 'react';
import './UserList.css'; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; 

interface User {
  nome: string;
  idade: number;
  telefone: string;
  id: number;
}

const UserList = () => {
  const [users, setUsers] = useState<User[] | undefined>([]);
  const [openAddModal, setOpenAddModal] = useState(false); // Controla a visibilidade do modal de adicionar
  const [openEditModal, setOpenEditModal] = useState(false); // Controla a visibilidade do modal de edição
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number | string>('');
  const [telefone, setTelefone] = useState('');
  const [userId, setUserId] = useState<number | null>(null); // Para identificar qual usuário está sendo editado

  useEffect(() => {
    fetch('http://localhost:8800/users') // URL do backend
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  // Handler para adicionar o usuário
  const handleAddUser = async () => {
    const newUser = {
      nome,
      idade: Number(idade), 
      telefone,
    };

    try {
      const response = await fetch('http://localhost:8800/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        const addedUser = await response.json();
        setUsers(prevUsers => [...(prevUsers || []), addedUser]); // Atualiza a lista de usuários com o novo usuário
        setOpenAddModal(false); // Fecha o modal de adicionar após o envio
        setNome('');
        setIdade('');
        setTelefone('');
      } else {
        console.error('Erro ao adicionar usuário');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

   // Handler para excluir o usuário
   const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8800/users/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedUser = await response.json();
        console.log(deletedUser.message);  

        // Atualiza a lista de usuários removendo o usuário excluído
        setUsers(prevUsers => prevUsers?.filter(user => user.id !== id));
      } else {
        console.error('Erro ao excluir usuário');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  // Handler para editar o usuário
  const handleEditUser = async () => {
    const editedUser = {
      nome,
      idade: Number(idade), 
      telefone,
    };
  
    try {
      const response = await fetch(`http://localhost:8800/users/edit/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser.message);  
  
        // Atualiza a lista de usuários com os dados do usuário editado
        setUsers(prevUsers => 
          prevUsers?.map(user => 
            user.id === userId ? { ...user, ...editedUser } : user
          )
        );
        setOpenEditModal(false); 
        setNome('');
        setIdade('');
        setTelefone('');
      } else {
        console.error('Erro ao editar usuário');
      }
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  // Função para abrir o modal de edição com os dados do usuário a ser editado
  const handleOpenEditModal = (user: User) => {
    setNome(user.nome);
    setIdade(user.idade);
    setTelefone(user.telefone);
    setUserId(user.id);  // Guarda o ID do usuário
    setOpenEditModal(true);  
  };

  return (
    <div className="user-list-container">
      {/* Modal de Adicionar Usuário */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogTrigger asChild>
          <Button>Adicionar Usuário</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar um novo usuário.
            </DialogDescription>
          </DialogHeader>

          <div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="idade">Idade:</label>
                <input
                  type="number"
                  id="idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Usuário */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>

          <div>
            <form onSubmit={(e) => { e.preventDefault(); handleEditUser(); }}>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="idade">Idade:</label>
                <input
                  type="number"
                  id="idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div>
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <h2 className="user-list-title">Lista de Usuários</h2>
      <ul className="user-list">
        {users?.map(user => (
          <li key={user.id} className="user-item">
            <span className="user-name">{user.nome}</span>
            <div className="user-info">
              <span>ID: {user.id}</span>
              <span>Idade: {user.idade}</span>
              <span>Telefone: {user.telefone}</span>
            </div>
            <Button onClick={() => handleDeleteUser(user.id)}>Excluir</Button>
            <Button onClick={() => handleOpenEditModal(user)}>Editar</Button> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
