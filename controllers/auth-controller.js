const db = require('../util/database.js');

//Dummy array

const users = [
    { id: 1, email: 'john@somemail.com', password: 'johnspassword', visits: 0 },
    { id: 2, email: 'jane@somemail.com', password: 'janespassword', visits: 0 },
    { id: 3, email: 'jim@somemail.com', password: 'jimspassword', visits: 0 }
];

//

module.exports.getLoginRegister = async (req, res) => {

    res.render('./auth/login-register', { singleArtist: req.featuredArtist });

}

module.exports.getLogin = async (req, res) => {

    res.render('./auth/login');

}

module.exports.getRegister = async (req, res) => {

    res.render('./auth/register');

}

module.exports.postLogin = async (req, res) => {

    const { email, password } = req.body;

    if (email && password) {
        const existingUser = users.find(usr => usr.email == email && usr.password == password);
        if (existingUser) {

            if (req.cookies.userId && req.cookies.visits) {
                users[req.cookies.userId - 1]['visits'] = req.cookies['visits'];
                console.log(users);
            }

            req.session.userId = existingUser.id;
            res.clearCookie('visits');
            res.clearCookie('userId');
            console.log(req.session.userId);
            res.redirect('/');
        } else {
            res.send('User Not Found!');
        }
    }
}

module.exports.postRegister = async (req, res) => {

    const { email, password } = req.body;

    if (email && password) {
        const userExists = users.some(
            usr => usr.email == email
        )

        if (!userExists) {
            const newUser = {
                id: users.length + 1,
                email,
                password
            }

            users.push(newUser);
            req.session.userId = newUser.id
            console.log(users, req.session.userId);

            res.redirect('/');
        } else {
            res.send('User Exists!');
        }
    }

}

module.exports.postLogout = async (req, res) => {

    if (req.cookies.userId && req.cookies.visits) {
        users[req.cookies.userId - 1]['visits'] = req.cookies['visits'];
        console.log(users);
    }

    req.session.destroy();
    res.clearCookie('userId');
    res.clearCookie('visits');
    res.clearCookie('sid');
    res.redirect('/');

}

module.exports.getUserInfo = (userId) => {
    console.log(`Currently Logged In as ${users[userId - 1].email}`)

    return users[userId - 1].email;
}

module.exports.visitsCookieCounter = (req, res) => {

    let visits = parseInt(req.cookies['visits']);

    if (!visits) {

        if (req.cookies['userId']) {
            console.log(users[req.cookies.userId - 1])
            visits = parseInt(users[req.cookies.userId - 1]['visits']) + 1;
        } else {
            return;
        }

    } else {
        visits = parseInt(visits) + 1;
    }

    res.cookie('visits', visits);
}