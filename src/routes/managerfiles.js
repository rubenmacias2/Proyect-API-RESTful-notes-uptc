const router = require('express').Router();
const fs = require('fs');
const files = process.cwd() + '/src/files/';
const multer = require('multer');

const storege = multer.diskStorage({
    destination: './src/files',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storege,
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


router.get('/show-file', (req, res) => {
    var name = req.query.namefile;
    if (fs.existsSync(files + name)) {
        console.log({ "mensaje": "exite" });
        res.sendFile(files + name);
    } else {
        res.send({ "mensaje": "no existes" });
    }
});
router.get('/download-file', (req, res) => {
    var name = req.query.namefile;
    if (fs.existsSync(files + name)) {

        console.log({ "mensaje": "exite" });
        res.download(files + name);
    } else {
        res.send({ "mensaje": "no existes" });

    }
});
router.get('/delete-file', (req, res) => {
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
router.post('/load-file', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send({ "mensaje": 'Eviado correctamente' });
});

module.exports = router;