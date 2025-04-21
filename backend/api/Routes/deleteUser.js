// Routes/deleteUser.js
import express from 'express';
import { deleteUser } from '../Controllers/deleteUser.js';  // Função para excluir o usuário

const router = express.Router();

// Rota para excluir um usuário com base no ID
router.delete('/delete/:id', deleteUser);  // A URL será /users/delete/:id

export default router;
