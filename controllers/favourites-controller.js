const db = require('../util/database.js');

module.exports.postFavourites = async (req, res) => {

    const queryT1 = `SELECT * from FAVOURITES where user_id=${req.currentUser.id}`;

    const { rows } = await db.query(queryT1);

    console.log(rows);

    const songAlrInFavs = rows.some(log => {
        return log['song_id'] == req.body.songId;
    })

    if (songAlrInFavs || !rows[0]) {

        return;

    } else {

        const queryT2 = `INSERT INTO favourites (user_id, song_id) VALUES($1, $2)`;
        const queryV2 = [req.currentUser.id, req.body.songId];

        const resultTwo = await db.query(queryT2, queryV2);

        console.log(resultTwo['rows']);

    }
}