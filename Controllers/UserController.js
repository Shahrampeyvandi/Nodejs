const User = require('../models/User')  //import User Model




exports.login = function (req, res) {
    let user = new User(req.body)
    user.login().then(response => {
        req.session.user = {username : user.data.username} // store session in server memory after login but this way not good
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
}

exports.register = function (req, res) {
    let user = new User(req.body) //user object from User Model
    user.register()
    if (user.errors.length) {
        res.send(user.errors[0])
    } else {
        res.send('register successfully')
    }
}

exports.home = function (req, res) {

    if (req.session.user) {
        res.send('you have a session')
    }else{

        res.render('home-guest')
    }
}