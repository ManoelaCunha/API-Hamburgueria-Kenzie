const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

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

const router = jsonServer.router(inMemoryDB);
const rules = auth.rewriter({
  users: 600,
  products: 444,
  cart: 640,
});

app.db = router.db;

// Adiciona middlewares padrões do json-server
const middlewares = jsonServer.defaults();
app.use(middlewares);

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

// Middleware para gerenciar POST e DELETE
app.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/cart") {
    const { body } = req;
    inMemoryDB.cart.push(body);
    return res.status(201).json(body);
  }
  if (req.method === "POST" && req.path === "/users") {
    const { body } = req;
    const newUser = {
      ...body,
      id: inMemoryDB.users.length + 1,
    };
    inMemoryDB.users.push(newUser);
    return res.status(201).json(newUser);
  }
  if (req.method === "DELETE" && req.path.startsWith("/cart/")) {
    const id = parseInt(req.path.split("/").pop(), 10);
    inMemoryDB.cart = inMemoryDB.cart.filter((item) => item.id !== id);
    return res.status(204).end();
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
