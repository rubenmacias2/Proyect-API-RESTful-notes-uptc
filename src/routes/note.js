const router = require('express').Router();
var scNote = require('../models/modelNote');

router.post('/add-note', async(req, res) => {
    var manager = new scNote({
        userid: req.query.userid,
        name: req.query.name,
        text: req.query.text,
        namefile: req.query.namefile,
        type: req.query.type,
    });
    manager.save(() => console.log("save note"));
    res.send({ "mensaje": "save note" });
});
router.get('/show-all-notes', async(req, res) => {
    scNote.find({ "userid": req.query.userid }, (err, doc) => {
        console.log(`DB Total Documents: ${doc.length}`);
        if (doc != null) {
            res.send(doc);
        } else {
            res.send({ massage: "no existen notas" });
        }
    });
});
router.get('/find-note', async(req, res) => {
    scNote.find({ "_id": req.query.idnota }, (err, doc) => {
        console.log(`DB Total Documents: ${doc.length}`);
        if (doc != null) {
            res.send(doc);
        } else {
            res.send({ massage: "no existe la nota" });
        }
    });
});
router.delete('/delete-nota', async(req, res) => {
    var notas = await scNote.find({ "_id": req.query.idnota });
    if (notas != null) {
        var i = 0;
        for (const nota of notas) {
            console.log(nota);
            i++;
            await scNote.deleteOne(nota);
        }
        res.send({ message: `delete ${i} notes succeful` });
    } else {
        res.send({ message: 'no existe' });
    }
});
router.put('/update-nota', async(req, res) => {
    var nota = await scNote.findOne({ "__id": req.query.idnote });
    if (nota != null) {
        await scNote.updateOne({ _id: nota._id }, { $set: req.query });
        res.send({ message: 'actualizado' });
    } else {
        res.send({ message: 'no existe' });
    }
});

module.exports = router;