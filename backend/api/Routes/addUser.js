import express from "express";
import { addUser } from "../Controllers/addUser.js";  // Importa a função para adicionar usuários

const router = express.Router();

// Rota POST para adicionar um novo usuário
router.post("/add", addUser);  // Quando acessar /users/add, chama a função addUser

export default router;
