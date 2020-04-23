const db = require('../util/database.js');

module.exports.postFavourites = async (req, res) => {

    const queryT1 = `SELECT * FROM favourites WHERE user_id=${req.currentUser.id}`;

    const { rows } = await db.query(queryT1);

    console.log(rows);

    const songAlrInFavs = rows.some(log => {
        return log['song_id'] == req.body.songId;
    })

    if (songAlrInFavs) {

        return;

    } else {

        const queryT2 = `INSERT INTO favourites (user_id, song_id) VALUES($1, $2)`;
        const queryV2 = [req.currentUser.id, req.body.songId];

        const resultTwo = await db.query(queryT2, queryV2);

        console.log(resultTwo['rows']);

    }
}

module.exports.getAllFavourites = async (req, res) => {

    const queryT = `SELECT * FROM favourites WHERE user_id = ${req.currentUser.id} ORDER BY id`;

    const { rows } = await db.query(queryT);


    if (rows.length == 0) {
        res.render('./favourites/favourites-all', {
            favouriteSongs: "",
            currentUser: req['currentUser']
        })
    } else {
        const favouriteSongsIdArr = rows
            .reduce((acc, log) => {
                acc.push(log['song_id']);
                return acc;
            }, [])

        const queryT2 = `SELECT * FROM songs WHERE id IN (${favouriteSongsIdArr.toString()})`;
        const resultTwo = await db.query(queryT2);
        const favouriteSongsArr = resultTwo.rows;

        res.render('./favourites/favourites-all', {
            favouriteSongs: favouriteSongsArr,
            currentUser: req['currentUser']
        })
    }


}

module.exports.deleteFavourites = async (req, res) => {
    const queryT = `DELETE FROM favourites WHERE user_id = ${req.currentUser.id} AND song_id = ${req.body.songId}`;

    await db.query(queryT);

    res.redirect('./');
}