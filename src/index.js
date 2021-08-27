const express = require('express');
const cors = require('cors');
require('./dbconnect');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


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

app.use(require('./routes/user'));

app.listen(port, () => console.log(`Server Listen to Port ${port}`));