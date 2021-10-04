const router = require('express').Router();
var scUser = require('../models/modelUser');


// cambiar a post post para traer datos para guardar en la db
router.post('/sign-up', async(req, res) => {
    var user = await scUser.findOne({ "username": req.query.username });

    if (user == null) {
        var manager = new scUser({
            "username": req.query.username,
            "name": req.query.name,
            "password": req.query.password,
            "lastName": req.query.lastname,
            "mail": req.query.mail,
            "type": req.query.type,
        });
        manager.save(() => console.log("save"));
        res.send({ "mensaje": "sign up successful" });
    } else {
        res.send({ "mensaje": "existing user" });
    }
});

router.post('/sign-in', async(req, res) => {
    var user = await scUser.findOne({ "username": req.query.username });
    if (user != null) {
        if (user.password === req.query.password) {
            res.send(user);
        } else {
            res.send({ "mensaje": "Incorrect password" });
        }
    } else {
        res.send({ "mensaje": "Non-existent user" });
    }

});

router.get('/show-all-user', async(req, res) => {
    scUser.find((err, doc) => {
        console.log(doc.length);
        res.send(doc);
    }).sort({ name: 1 });
});

router.get('/show-user', async(req, res) => {
    scUser.find({ "username": req.query.username }, (err, doc) => {
        console.log(`DB Total Documents: ${doc.length}`);
        if (doc != null) {
            res.send(doc);
        } else {
            res.send({ massage: "no existe usuario" });
        }
    });
});
router.delete('/delete-user', async(req, res) => {
    var users = await scUser.find({ "username": req.query.username });
    if (users != null) {
        var i = 0;
        for (const user of users) {
            i++;
            await scUser.deleteOne(user);
        }
        res.send({ massage: `delete ${i} user succeful` });
    } else {
        res.send({ message: 'no existe' });
    }
});

router.put('/update-user', async(req, res) => {
    //var user = await userSc.updateOne({ _id: req.query._id }, { $set: req.query });
    var user = await scUser.findOne({ username: req.query.username });
    if (user != null) {
        await scUser.updateOne({ _id: user._id }, { $set: req.query });
        res.send({ message: 'actualizado' });
    } else {
        res.send({ message: 'no existe' });
    }
});

module.exports = router;