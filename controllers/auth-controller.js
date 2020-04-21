const db = require('../util/database.js');
const sha256 = require('js-sha256');
const User = require('../models/user.js');


module.exports.getLoginRegister = async (req, res) => {

    res.render('./auth/login-register', { singleArtist: req.featuredArtist });

}

module.exports.getLogin = async (req, res) => {

    res.render('./auth/login', { invalidMsg: req.session.invalidMsg });

}

module.exports.getRegister = async (req, res) => {

    res.render('./auth/register');

}

module.exports.postLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        req.session.invalidMsg = 'Please enter user email and password';

        res.redirect('./login');
    }

    const queryT1 = `SELECT * FROM users WHERE email ='${email}'`
    const { rows } = await db.query(queryT1);

    if (!rows[0]) {

        req.session.invalidMsg = 'Email is not registered'

        res.redirect('./login');

    } else if (rows[0].password !== sha256(password)) {

        req.session.invalidMsg = 'Wrong password'

        res.redirect('./login');

    } else if (rows[0]['email'] == email && rows[0]['password'] == sha256(password)) {

        if (req.cookies.userId && req.cookies.visits) {
            const queryT2 = `UPDATE users SET visits=${req.cookies.visits} WHERE id=${req.cookies.userId}`
            await db.query(queryT2);
        }

        req.session.userId = rows[0].id;
        req.sessions.invalidMsg = "";
        res.clearCookie('visits');
        res.clearCookie('userId');
        console.log(req.session.userId);
        res.redirect('/');
    }
}

module.exports.postRegister = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        req.session.invalidMsg = 'Please enter your email and password';

        res.redirect('./register');
    }

    const queryT1 = `SELECT * FROM users`
    const { rows } = await db.query(queryT1);


    if (email && password) {
        const userExists = rows.some(
            usr => usr['email'] == email
        )

        if (!userExists) {
            const newUser = new User(email, sha256(password));

            const queryT2 = `INSERT INTO users (email, password) VALUES($1, $2)`;
            const queryV2 = [newUser.email, newUser.password];

            await db.query(queryT2, queryV2);

            const queryT3 = `SELECT * FROM users WHERE email='${newUser.email}'`;
            const resultThree = await db.query(queryT3);

            req.session.userId = resultThree.rows[0].id;

            res.redirect('/');

        } else {

            req.session.invalidMsg = 'User already exists. Please Login.';

            res.redirect('./login');

        }
    }

}

module.exports.postLogout = async (req, res) => {

    if (req.cookies.userId && req.cookies.visits) {

        const queryT = `UPDATE users SET visits=${req.cookies.visits} WHERE id=${req.cookies.userId}`;

        await db.query(queryT);

    }

    req.session.destroy();
    res.clearCookie('userId');
    res.clearCookie('visits');
    res.clearCookie('sid');
    res.redirect('/');

}

module.exports.getUserInfo = async (userId) => {

    const queryT = `SELECT * FROM users WHERE id=${userId}`;

    const { rows } = await db.query(queryT);

    console.log(`Currently Logged In as ${rows[0].email}`)

    return rows[0];
}

module.exports.visitsCookieCounter = async (req, res) => {

    let visits = parseInt(req.cookies['visits']);

    if (!visits) {

        if (req.cookies['userId']) {

            const queryT = `SELECT id, visits FROM users WHERE id=${req.cookies['userId']}`;

            const { rows } = await db.query(queryT);

            visits = parseInt(rows[0]['visits']) + 1;

        } else {

            return;

        }

    } else {

        visits = parseInt(visits) + 1;

    }

    res.cookie('visits', visits);

}