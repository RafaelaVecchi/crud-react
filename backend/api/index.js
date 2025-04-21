// configurações da api

import express from "express"
import cors from "cors"
import userRoutes from "./Routes/users.js";  // Rota para buscar usuários (GET)
import addUserRoutes from "./Routes/addUser.js";  // Rota para adicionar usuário (POST)
import deleteUserRoutes from './Routes/deleteUser.js';  // Rota para excluir usuários (DELETE)
import editUserRoutes from './Routes/editUser.js';  // Rota para editar usuários (PUT)

const app = express()

app.use(express.json())
app.use(cors())


// Usando as rotas
app.use("/users", userRoutes);  
app.use("/users", addUserRoutes); 
app.use('/users', deleteUserRoutes); 
app.use('/users', editUserRoutes);   


app.listen(8800) // estou abrindo uma porta




