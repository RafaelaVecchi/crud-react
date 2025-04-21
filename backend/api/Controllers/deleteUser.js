// Controllers/deleteUser.js
import { db } from "../db.js"; 

export const deleteUser = (req, res) => {
  const userId = req.params.id;  // Pega o ID do usuário a ser excluído

  const q = "DELETE FROM usuarios WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao excluir usuário.", details: err });
    }

    // Verifica se o usuário foi realmente excluído
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ message: "Usuário excluído com sucesso." });
  });
};
