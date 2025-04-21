// Controllers/editUser.js
import { db } from "../db.js"

export const editUser = (req, res) => {
  const userId = req.params.id
  const { nome, idade, telefone, cpf, email } = req.body

  // Verifica se os dados foram fornecidos
  if (!nome || !idade || !telefone || !cpf || !email) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." })
  }

  const q = `
    UPDATE usuarios
    SET nome = ?, idade = ?, telefone = ?, cpf = ?, email = ?
    WHERE id = ?
  `

  db.query(q, [nome, idade, telefone, cpf, email, userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao editar usuário.", details: err })
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso." })
  })
}
