const express = require("express");
const routes = require("./src/routes");
const app = express();
const port = 3333;
require("./src/config/db.Config");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
