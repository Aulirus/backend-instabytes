import express from "express"; // Importa a biblioteca Express.js para criar a aplicação web.
import multer from "multer"; // Importa a biblioteca multer para lidar com uploads de arquivos.

// Importa as funções controladoras para posts: listarPosts, postarNovoPost e uploudImagem.
// Provavelmente essas funções estão definidas em um arquivo separado (../controllers/postsController.js).
import { listarPosts, postarNovoPost, uploudImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados: ./uploads
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original enviado.
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com a configuração de armazenamento.
const uploud = multer({ dest:"./uploads", storage}); 

const routes = (app) => {
  // Habilita o Express a entender requisições com corpo no formato JSON.
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts.
  // Provavelmente a função listarPosts busca e retorna os posts do banco de dados ou de outra fonte.
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post.
  // A função postarNovoPost provavelmente recebe os dados do post na requisição e salva no banco de dados ou em outra fonte.
  app.post("/posts", postarNovoPost);


  // Rota POST para upload de imagem.
  // Utiliza o middleware multer.single("imagem") para lidar com o upload de um único arquivo chamado "imagem".
  // Após o upload bem-sucedido, chama a função uploudImagem para processar a imagem (salvar, redimensionar, etc.).
  app.post("/upload", uploud.single("imagem"), uploudImagem);

  app.put("/upload/:id", atualizarNovoPost);
}

export default routes; // Exporta a função routes para ser utilizada em outro arquivo.