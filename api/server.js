const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = jsonServer.create();
const port = process.env.PORT || 3001;

// Caminho para os arquivos JSON
const dbPath = path.join(process.cwd(), "db.json");
const routesPath = path.join(process.cwd(), "routes.json");

const router = jsonServer.router(dbPath);
const rules = auth.rewriter(JSON.parse(fs.readFileSync(routesPath, "utf8")));

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
