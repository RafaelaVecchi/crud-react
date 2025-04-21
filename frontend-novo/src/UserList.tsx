import { useEffect, useState } from 'react';
import '@/styles/UserList.css'; 

interface User {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  cpf: string;
  email: string;
}


const UserList = () => {
  const [users, setUsers] = useState<User[] | undefined>([]);

  useEffect(() => {
    fetch('http://localhost:8800/users') // URL do backend
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <>
      <div className="user-list-container">
        <h2 className="user-list-title">Lista de Usuários</h2>
        <ul className="user-list">
          {users?.map(user => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.nome}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
