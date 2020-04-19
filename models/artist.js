const db = require('../util/database.js');

module.exports = class Artist {

    constructor(name, nationality, photo) {

        this.name = name;
        this.nationality = nationality;
        this.photo = photo;

    }

    async save() {

        const queryT = `INSERT INTO artists(name, nationality, photo_url) VALUES($1, $2, $3) RETURNING *`;
        const queryV = [this.name, this.nationality, this.photo];

        const { rows } = await db.query(queryT, queryV);

        return rows;

    }

    static async get(artistId) {

        const queryT = `SELECT * FROM artists WHERE id=${artistId}`
        const { rows } = await db.query(queryT);

        return rows;

    }

    static async edit(name, nationality, photo, artistId) {
        const queryT = `UPDATE artists SET name = '${name}', nationality = '${nationality}', photo_url = '${photo}' WHERE id=${artistId}`
        const { rows } = await db.query(queryT);

        return rows;

    }

    static async delete(artistId) {

        const queryT = `DELETE from artists WHERE id=${artistId}`
        const { rows } = await db.query(queryT);

        return rows;

    }
}