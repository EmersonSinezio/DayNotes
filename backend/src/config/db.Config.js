const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Conecta ao MongoDB
const connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://emersonsineziio:drRYnadsNsnXHkK4@cluster0.okd2t.mongodb.net/dayNotes?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Aumente o timeout para 30 segundos
    }
  );
};

module.exports = {
  mongoose,
  connectDB,
};
