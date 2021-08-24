const mongoose = require('mongoose');

const urlDb = "mongodb+srv://ruben:3142681446Rr@cluster0.brcma.mongodb.net/DB_Notas_UPTC?retryWrites=true&w=majority";

mongoose.connect(urlDb, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(db => console.log("Connected DB"))
    .catch(err => console.err(err));

module.exports = mongoose;