const db = require('../util/database.js');

module.exports = class Song {

    constructor(title, album, link, art, artistId) {
        this.title = title;
        this.album = album;
        this.link = link;
        this.art = art;
        this.artistId = artistId;

    }

    async save() {
        const queryT = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const queryV = [this.title, this.album, this.link, this.art, this.artistId]

        const { rows } = await db.query(queryT, queryV);
        console.log(rows);

    }

    static async getAll(artistId) {

        const queryT = `SELECT * FROM songs WHERE artist_id = ${artistId} ORDER BY id`
        const { rows } = await db.query(queryT);

        return rows;
    }

    static async edit(title, album, link, art, artistId, songId) {

        const queryT = `UPDATE songs SET title = '${title}', album = '${album}', preview_link = '${link}', artwork = '${art}', artist_id = '${artistId}' WHERE id=${songId} RETURNING *`

        const { rows } = await db.query(queryT);

        return rows;
    }

    static async delete(songId) {
        const queryT = `DELETE from songs WHERE id=${songId}`
        const { rows } = await db.query(queryT);

        return rows;
    }
}