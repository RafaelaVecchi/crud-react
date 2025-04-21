// é por onde nosso frontend vai se comunicar com o backend.
// Aqui, estamos importando o método getUsers do arquivo users.js, que está dentro da pasta Controllers.

import express from "express";
import { getUsers } from "../Controllers/users.js";

const router = express.Router()

router.get("/", getUsers)

export default router