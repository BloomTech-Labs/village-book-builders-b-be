const port = process.env.PORT || 5000;
const jsonServer = require('json-server-relationship');
const auth = require('json-server-auth');
const fs = require('fs');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const routes = JSON.parse(fs.readFileSync('./routes.json'));
const rules = auth.rewriter(routes);

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.db = router.db;
//binding app to db

app.use(router);

app.listen(port, () => console.log(`\n** Running on port ${port} **\t http://localhost:${port}/\n`));
