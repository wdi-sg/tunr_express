const db = require('../util/database.js');
const getDateUtil = require('../util/get-date.js');

module.exports = class Playlist {

    constructor(name) {
        this.name = name;
    }

    async save(reqBody) {

        if (!Array.isArray(reqBody.artist))
            reqBody.artist = reqBody.artist.split();

        if (!Array.isArray(reqBody.song))
            reqBody.song = reqBody.song.split();

        let i = 0;
        const playlistArr = reqBody.artist
            .reduce((arr, el) => {

                const obj = { 'artist': el, 'song': reqBody.song[i] };
                i++;
                return arr.push(obj), arr;

            }, [])

        const queryT1 = `INSERT into playlists(created_on, name) VALUES ($1, $2) RETURNING *`
        const queryV1 = [getDateUtil.getTimeStamp(), this.name];

        const resultOne = await db.query(queryT1, queryV1);

        playlistArr.forEach(async playlistSong => {

            const queryT2 = `SELECT id, artist_id FROM songs WHERE title='${playlistSong.song}'`;
            const { rows } = await db.query(queryT2);

            const queryT3 = `INSERT into playlists_songs(song_id, playlist_id) VALUES ('${rows[0].id}', '${resultOne.rows[0].id}') RETURNING *`
            const resultThree = await db.query(queryT3);

        })

        return resultOne.rows;

    }

    static async get(playlistId) {

        const queryT = `SELECT * FROM playlists WHERE id=${playlistId}`;
        await db.query(queryT);

        const queryT2 = `SELECT * from playlists_songs INNER JOIN songs ON playlists_songs.song_id = songs.id WHERE playlist_id=${playlistId}`

        const resultTwo = await db.query(queryT2);

        return resultTwo.rows;
    }

    static async getAll() {

        const { rows } = await db.query('SELECT * FROM playlists');

        return rows;

    }
}