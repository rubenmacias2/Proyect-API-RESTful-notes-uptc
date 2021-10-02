const router = require('express').Router();
const fs = require('fs');
const files = process.cwd() + '/src/files/';
router.get('/patos', (req, res) => {
    var name = req.query.namefile;
    if (fs.existsSync(files + name)) {
        console.log({ "mensaje": "exite" });
        res.sendFile(files + name);
    } else {
        res.send({ "mensaje": "no existes" });
    }
});
router.get('/dpatos', (req, res) => {
    var name = req.query.namefile;
    if (fs.existsSync(files + name)) {

        console.log({ "mensaje": "exite" });
        res.download(files + name);
    } else {
        res.send({ "mensaje": "no existes" });

    }
});
router.get('/lepatos', (req, res) => {
    var name = req.query.namefile;
    if (fs.existsSync(files + name)) {
        console.log({ "mensaje": "exite" });
        fs.unlink(files + name, (err) => {
            if (err) throw err;
            res.send({ 'mensaje': 'deleted' });
        });

    } else {
        res.send({ "mensaje": "no existes" });

    }
});
router.get('/ar', (req, res) => {
    var v = (JSON.parse(req.query.name));
    console.log(v.length);
    res.send("exito");
});

module.exports = router;