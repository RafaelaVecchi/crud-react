// credenciais do banco de dados

import mysl from "mysql2"; // mysql2 porque o mysql não funcionou

export const db = mysl.createConnection({
    host: "localhost",
    user: "root",
    password: "Brother25525&",
    database: "crud"
});