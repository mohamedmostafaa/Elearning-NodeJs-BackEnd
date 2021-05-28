const User = require('../models/user')
const bcrypt = require('bcryptjs');

exports.configSrv = (req, res) => {


    User.findOne({ role: 'admin' }).then((result) => {
        if (!result) {
            const admin = new User({

                email: "pfe@gmail.com",
                password: bcrypt.hashSync("pfe", 10),

                role: 'admin'

            })

            admin.save().then(() => {
                res.send('hello admin ')
            })
        }
        res.send('hello admin ')

    })



}
exports.checkUserToken = (req, res, next) => {
    // check that the user sent a token in the request header
    if (!req.header('authorization')) {
        // no header, no need to go further
        return res.status(401).json({
 success: false, message: "Header d'authentification manquant" });
    }

    const authorizationHeaderParts = req.header('authorization').split(' ');
    // parts are 'Bearer theToken'
    let token = authorizationHeaderParts[1];
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token non valide" });
        } else {
            console.log('decodedToken ', decodedToken);
            next();
        }
    });
};


