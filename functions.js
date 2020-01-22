const React = require("react");
const pg = require("pg");
const configs = {
  user: "benn",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432
};

const pool = new pg.Pool(configs);

module.exports.showArtists = (request, response) => {
  let query = "SELECT * from artists";
  pool.query(query, (err, result) => {
    if (err) {
      response.send("error");
    } else {
      const data = {
        artists: result.rows
      };
      response.render("home", data);
    }
  });
};

module.exports.showSingleArtist = (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "SELECT * from artists where id = $1";
  pool.query(query, values, (err, result) => {
    // console.log(result.rows)
    if (err) {
      response.render("404");
    } else {
      if (result.rows === undefined) {
        response.render("404");
      }
      if (result.rows.length === 0) {
        response.render("404");
      }
      const data = {
        artists: result.rows[0]
      };
      response.render("home", data);
    }
  });
};

module.exports.addArtistPage = (request, response) => {
  response.render("new");
};

module.exports.artistEditPage = (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "SELECT * from artists where id = $1";
  pool.query(query, values, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      const data = {
        artists: result.rows[0]
      };
      response.render("edit", data);
    }
  });
};

module.exports.addSongPage = (request, response) => {
  const artistId = request.params.id;
  const data = {
    artistId: artistId
  };
  response.render("newSong", data);
};

module.exports.showArtistSongs = (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const artistQuery = "SELECT * from artists where id = $1";
  pool.query(artistQuery, values, (err, artistResult) => {
    if (err) {
      response.send(err);
    } else {
      const artist = artistResult.rows[0];
      const artistId = artist.id;
      const values = [artistId];
      const songsQuery = "SELECT * from songs where artist_id = $1";
      pool.query(songsQuery, values, (err, songsResult) => {
        if (err) response.send(err);
        else {
          const songs = songsResult.rows;
          const data = {
            artist: artist,
            songs: songs
          };
          response.render("songs", data);
        }
      });
    }
  });
};

module.exports.editArtist = (request, response) => {
  const id = request.params.id;
  const artistName = request.body.name;
  const photoURL = request.body.photoURL;
  const nationality = request.body.nationality;

  const values = [artistName, photoURL, nationality, id];

  const query = `UPDATE artists
  SET name = $1, photo_url = $2, nationality = $3
  WHERE id= $4`;

  pool.query(query, values, (err, result) => {
    if (err) {
      response.render("404");
    } else {
      response.redirect("/");
    }
  });
};

module.exports.addArtist = (request, response) => {
  const artistName = request.body.name;
  const photoURL = request.body.photoURL;
  const nationality = request.body.nationality;
  const values = [artistName, photoURL, nationality];
  const query =
    "INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3)";
  console.log(values);
  pool.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      response.send("NO");
    } else {
      const artistsQuery = "SELECT * from artists;";
      pool.query(artistsQuery, (err, artistResult) => {
        const data = {
          artists: artistResult.rows
        };
        response.redirect("/");
      });
    }
  });
};

module.exports.addSong = (request, response) => {
  const artistId = request.params.id;
  const title = request.body.title;
  const album = request.body.album;
  const previewLink = request.body.preview_link;
  const artwork = request.body.artwork;
  const values = [title, album, previewLink, artwork, artistId];
  console.log(values);
  const query =
    "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/");
    }
  });
};

module.exports.deleteArtist = (request, response) => {
  const artistId = request.params.id;
  const values = [artistId];
  const query = "DELETE FROM artists where id = $1";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/");
    }
  });
};
