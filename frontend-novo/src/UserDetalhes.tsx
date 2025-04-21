import { useEffect, useState } from 'react'
import '@/styles/UserList.css'

interface User {
  id: number
  nome: string
  idade: number
  telefone: string
  cpf: string
  email: string
}

const UserDetalhes = () => {
  const [users, setUsers] = useState<User[] | undefined>([])

  useEffect(() => {
    fetch('http://localhost:8800/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error))
  }, [])

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Dados dos Usuários</h2>
      <ul className="user-list">
        {users?.map(user => (
          <li key={user.id} className="user-item">
            <span className="user-name">{user.nome}</span>
            <div className="user-info">
              <span><strong>ID:</strong> {user.id}</span>
              <span><strong>Idade:</strong> {user.idade}</span>
              <span><strong>Telefone:</strong> {user.telefone}</span>
              <span><strong>CPF:</strong> {user.cpf}</span>
              <span><strong>Email:</strong> {user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetalhes
