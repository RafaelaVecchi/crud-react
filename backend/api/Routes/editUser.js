// Routes/editUser.js
import express from 'express';
import { editUser } from '../Controllers/editUser.js'; // Função para editar o usuário

const router = express.Router();

// Rota para editar um usuário com base no ID
router.put('/edit/:id', editUser);  // A URL será /users/edit/:id

export default router;
