const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/annotations", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((e) => {
    console.log(`Houve um erro ${e}`);
  });
