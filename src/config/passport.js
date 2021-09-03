const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const scUser = require('../models/modelUser');

passport.use(new localStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const userAdm = await scUser
        .find({ email: email });
    if (!userAdm) {
        return done(null, false, { success: 'Not User found.' });
    } else {
        const matchPass = await userAdm.matchPass(password);
        if (matchPass) {
            return done(null, userAdm);
        } else {
            return done(null, false, { alert: 'Incorrect Password.' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    scUser
        .findById(id, (err, user) => {
            done(err, user);
        });
});