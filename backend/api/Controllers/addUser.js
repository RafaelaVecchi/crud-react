import { db } from "../db.js"; // Conexão com o banco de dados

export const addUser = (req, res) => {
  console.log("Corpo recebido:", req.body);
  const { nome, idade, telefone, cpf, email } = req.body;

  // Verifica se os dados foram fornecidos corretamente
  if (!nome || !idade || !telefone) {
    return res.status(400).json({ error: "Nome, idade e telefone são obrigatórios." });
  }

  // Query SQL para inserir o novo usuário
  const q = "INSERT INTO usuarios (nome, idade, telefone, cpf, email) VALUES (?, ?, ?, ?, ?)";

  // Executa a query no banco de dados
  db.query(q, [nome, idade, telefone, cpf, email], (err, data) => {
    if (err) {
      console.log("Erro ao executar INSERT:", err);
      return res.status(500).json({ error: "Erro ao adicionar usuário.", details: err });
    }

    // Retorna a resposta com os dados do usuário adicionado
    res.status(201).json({
      id: data.insertId,  // Retorna o id do usuário gerado
      nome,
      idade,
      telefone,
      cpf,
      email
    });
  });
};
