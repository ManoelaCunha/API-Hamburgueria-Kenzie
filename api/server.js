const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = jsonServer.create();
const port = process.env.PORT || 3001;

// Carregar dados iniciais do db.json
const dbPath = path.join(process.cwd(), "db.json");
let db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// Armazenamento temporário em memória
const inMemoryDB = {
  users: [...db.users],
  products: [...db.products],
  cart: [...db.cart],
};

// Configurar o roteador e regras de autorização
const router = jsonServer.router(inMemoryDB);
const rules = auth.rewriter({
  users: 600,
  products: 444,
  cart: 640,
});

// Associar o banco de dados do roteador ao aplicativo
app.db = router.db;

// Adiciona middlewares padrões do json-server
const middlewares = jsonServer.defaults();
app.use(middlewares);

// Adiciona middleware CORS
app.use(cors());

// Adiciona regras de autorização
app.use(rules);
app.use(auth);

// Rotas específicas
app.post("/cart", (req, res) => {
  try {
    const { body } = req;
    inMemoryDB.cart.push(body);
    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

app.post("/users", (req, res) => {
  try {
    const { body } = req;
    const newUser = {
      ...body,
      id: inMemoryDB.users.length + 1,
    };
    inMemoryDB.users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

app.delete("/cart/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    inMemoryDB.cart = inMemoryDB.cart.filter((item) => item.id !== id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Middleware para gerenciar outros casos
app.use((req, res, next) => {
  next(); // Continue com o roteador do json-server para outras rotas
});

// Adiciona o roteador do json-server
app.use(router);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro no console
  res.status(500).json({ error: "Internal Server Error" }); // Resposta genérica de erro
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
