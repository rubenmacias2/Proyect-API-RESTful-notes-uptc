const router = require('express').Router();
var scUser = require('../models/modelUser');


// cambiar a post post para traer datos para guardar en la db
router.get('/sign-up', async(req, res) => {
    var manager = new scUser({
        "username": "ruben.macias",
        "name": "ruben",
        "password": "asdasd",
        "lastName": "macias",
        "mail": "ruben.macias@uptc.edu.co",
        "type": "student",
    });
    manager.save(() => console.log("save"));
    res.send({ "mensaje": "sign up successful" });
});

router.get('/sign-in', async(req, res) => {
    var user = await scUser.findOne({ "username": "sergio.quintana" });
    if (user != null) {
        if (user.password === "asdasd") {
            res.send({ "username": user._id, "password": "Correct", "name": user.name, "lastName": user.lastName, "type": user.type });
        } else {
            res.send({ "mensaje": "Incorrect password" });
        }
    } else {
        res.send({ "mensaje": "Non-existent user" });
    }

});

router.delete('/delete-user', async(req, res) => {
    var user = await scUser.findOne({ "username": req.query.username });
    if (user != null && user.type == "student") {
        await scUser.deleteOne(user);
        res.send({ massage: "delete succeful" });
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