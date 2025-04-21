import React, { useEffect, useState } from 'react'
import '@/styles/UserList.css'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface User {
  id: number
  nome: string
  idade: number
  telefone: string
  cpf: string
  email: string
}

const UserCadastro = () => {
  const [users, setUsers] = useState<User[] | undefined>([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState<number | string>('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    fetch('http://localhost:8800/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error))
  }, [])

  const handleAddUser = async () => {
    const newUser = {
      nome,
      idade: Number(idade),
      telefone,
      cpf,
      email,
    }

    try {
      const response = await fetch('http://localhost:8800/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const addedUser = await response.json()
        setUsers(prev => [...(prev || []), addedUser])
        setOpenAddModal(false)
        setNome('')
        setIdade('')
        setTelefone('')
        setCpf('')
        setEmail('')
        toast.success("Usuário cadastrado com sucesso!")
      } else {
        toast.error("Erro ao cadastrar usuário.")
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor.")
      console.error('Erro ao adicionar usuário:', error)
    }
  }

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8800/users/delete/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setUsers(prev => prev?.filter(user => user.id !== id))
        toast.success("Usuário excluído com sucesso!")
      } else {
        toast.error("Erro ao excluir o usuário.")
      }
    } catch (error) {
      toast.error("Erro de conexão ao excluir usuário.")
      console.error('Erro ao excluir usuário:', error)
    }
  }

  const handleEditUser = async () => {
    const updatedUser = {
      nome,
      idade: Number(idade),
      telefone,
      cpf,
      email,
    }

    try {
      const response = await fetch(`http://localhost:8800/users/edit/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })

      if (response.ok) {
        setUsers(prev =>
          prev?.map(user => (user.id === userId ? { ...user, ...updatedUser } : user))
        )
        setOpenEditModal(false)
        setNome('')
        setIdade('')
        setTelefone('')
        setCpf('')
        setEmail('')
        toast.success("Usuário atualizado com sucesso!")
      } else {
        toast.error("Erro ao atualizar o usuário.")
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor.")
      console.error('Erro ao editar usuário:', error)
    }
  }

  const handleOpenEditModal = (user: User) => {
    setNome(user.nome)
    setIdade(user.idade)
    setTelefone(user.telefone)
    setCpf(user.cpf)
    setEmail(user.email)
    setUserId(user.id)
    setOpenEditModal(true)
  }

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Página de Cadastro</h2>

      {/* Botão de Cadastrar Novo Usuário */}
      <Dialog
        open={openAddModal}
        onOpenChange={(open) => {
          setOpenAddModal(open)
          if (open) {
            setNome('')
            setIdade('')
            setTelefone('')
            setCpf('')
            setEmail('')
            setUserId(null)
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            style={{ backgroundColor: '#FFD0C7', color: 'black' }}
            className="mb-4"
          >
            Adicionar Usuário
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
            <DialogDescription>Preencha os dados abaixo:</DialogDescription>
          </DialogHeader>
          <form onSubmit={e => { e.preventDefault(); handleAddUser() }}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="idade">Idade:</label>
              <input type="number" id="idade" value={idade} onChange={e => setIdade(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" id="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de edição */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>Atualize os dados do usuário.</DialogDescription>
          </DialogHeader>
          <form onSubmit={e => { e.preventDefault(); handleEditUser() }}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="idade">Idade:</label>
              <input type="number" id="idade" value={idade} onChange={e => setIdade(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" id="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lista com nomes e botões apenas */}
      <ul className="user-list">
        {users?.map(user => (
          <li key={user.id} className="user-item">
            <span className="user-name">{user.nome}</span>
            <div className="flex justify-center gap-2 mt-2">
              <Button onClick={() => handleDeleteUser(user.id)}>Excluir</Button>
              <Button onClick={() => handleOpenEditModal(user)}>Editar</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserCadastro
