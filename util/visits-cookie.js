module.exports.visitsCookieCounter = (req, res) => {

    let visits = req.cookies['visits'];

    if (visits === undefined) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    console.log('Visits: ' + visits);

    res.cookie('visits', visits);
}