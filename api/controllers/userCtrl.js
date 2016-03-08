var User = require('../models/UserModel.js');

module.exports = {
    //save or find user

    login: function (req, res) {
        if (req.session.user) {
            delete req.session.user;
        }
        var username = req.body.username
        User.findOne({ username: username })
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                else if (!user) {
                    var newUser = new User({
                        username: username
                    })
                    newUser.save(function (err, savedUser) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        req.session.user = savedUser;
                        console.log('user', req.session.savedUser);
                        return res.status(200).json(savedUser);
                    })
                } else {
                    req.session.user = user;
                    console.log('user', req.session.user);
                    return res.status(200).json(user);
                }
            })
    },
    logout: function (req, res) {
        if (req.session.user) {
            delete req.session.user;
        }
        console.log('user', req.session.user);
        return res.status(200).send('logged out')
    }




    //save list (and list ref to user)


}