const db = require('../util/database.js');

module.exports.getLogin = async (req, res) => {

    res.render('login');

}

module.exports.getRegister = async (req, res) => {

    res.send('Get Register Form');

}

module.exports.postLogin = async (req, res) => {

    res.send('Post Login Form');

}

module.exports.postRegister = async (req, res) => {

    res.send('Post Register Form');

}

module.exports.postLogout = async (req, res) => {

    res.send('Post Logout');

}