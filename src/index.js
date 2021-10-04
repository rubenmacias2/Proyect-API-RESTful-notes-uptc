const express = require('express');
const cors = require('cors');
require('./dbconnect');

const app = express();
const port = 3000;

app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/files/duck.gif');
});

app.use(require('./routes/user'));
app.use(require('./routes/note'));
app.use(require('./routes/managerfiles'));
app.set('port', process.env.PORT || port);
app.listen(app.get('port'), () => console.log(`Server Listen to Port ${app.get('port')}`));