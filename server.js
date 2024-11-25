import express from "express";
import routes from "./src/routes/postsRouts.js";
// Importa a biblioteca Express.js para criar a aplicação web.

const app = express();
app.use(express.static("uploads"))
routes(app);
// Cria uma instância do Express para gerenciar a aplicação.

app.listen(3000, () => {
    console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver pronto.
