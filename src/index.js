const express = require('express');
const cors = require('cors');
require('./dbconnect');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

var scUser = require('./models/modelUser');
const app = express();
const port = 3000;


app.use(session({
    secret: 'appNotes',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());

app.get('/', async function(req, res) {
    res.send(
        [{
            _id: "60b01e9747a0bd0859ea2a51",
            "name": "INEOS Grenadiers",
            "contry": "Reino Unido",
            "jersey": "ineos.jpg",
            "year": 2010,
        }]);
    //console.log(connecteddb.connection.db.collection('teamsProTour'));
    console.log("envio json");
});

// cambiar a post post para traer datos para guardar en la db
app.get('/save-admin', async(req, res) => {
    var manager = new scUser({
        "_id": "ruben.macias",
        "name": 1,
        "password": "asdasd",
        "lastName": 1,
        "mail": 1,
        "type": "student",
    });
    manager.save(() => console.log("save"));
    res.send("save succeful");
});

app.get('/show-team', async(req, res) => {
    scUser.findOne({ name: 1 }, (err, doc) => {
        console.log(doc);
        res.send(doc);
    });
});

app.get('/show-all', async(req, res) => {
    scUser.find((err, doc) => {
        console.log(doc);
        res.send(doc);
    });
});

app.listen(port, () => console.log(`Server Listen to Port ${port}`));