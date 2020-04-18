const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

const configs = {
  user: "postgres",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on("error", function (err) {
  console.log("IDLE CLIENT ERROR", err.message, err.stack);
});

//----------------------------------
//-------------ROUTES---------------
//----------------------------------

//VIEW HOME PAGE
app.get("/", (request, response) => {
  response.render("home");
});

//VIEW ALL ARTISTS
app.get("/artists/", (request, response) => {
  let queryText = "SELECT * from artists ORDER BY name ASC";
  pool.query(queryText, (err, result) => {
    let obj = {
      artists: result.rows,
    };
    response.render("display-all-artists", obj);
  });
});

//VIEW CREATE NEW ARTIST PAGE
app.get("/artists/new", (request, response) => {
  response.render("new-artist");
});

//CAPTURES NEW ARTIST DATA AND DISPLAYS IT
app.post("/artists/new", (request, response) => {
  let queryText = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${request.body.name}', '${request.body.photo_url}', '${request.body.nationality}') RETURNING *`;
  pool.query(queryText, (err, result) => {
    // console.log(result.rows[0]);
    let artistObj = result.rows[0];
    console.log(artistObj);
    response.render("display-one-artist", artistObj);
  });
});

//DISPLAY SINGULAR ARTIST DETAILS BASED ON ID
app.get("/artists/:id", (request, response) => {
  let id = request.params.id;
  let queryText = `SELECT * FROM artists WHERE id=${id}`;
  pool.query(queryText, (err, result) => {
    let artistObj = result.rows[0];
    response.render("display-one-artist", artistObj);
  });
});

//DISPLAY EDIT ARTIST FORM
app.get("/artists/:id/edit", (request, response) => {
  let id = request.params.id;
  let queryText = `SELECT * FROM artists WHERE id=${id}`;
  pool.query(queryText, (err, result) => {
    let artistObj = result.rows[0];
    console.log(artistObj);
    response.render("edit-artist", artistObj);
  });
});

//DISPLAY EDITED ARTIST DETAILS
app.post("/artists/:id/edit", (request, response) => {
  let id = request.params.id;
  let queryText = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id=${id} RETURNING *`;
  console.log(queryText);
  pool.query(queryText, (err, result) => {
    let artistObj = result.rows[0];
    // response.render("display-one-artist", artistObj);
    let link = "http://127.0.0.1:3000/artists/" + id;
    response.redirect(link);
  });
});

//VIEW ALL SONGS BY ARTIST
app.get("/artists/:id/songs", (request, response) => {
  let artist_id = request.params.id;
  let artistName;
  let queryText2 = `SELECT name from artists WHERE id=${artist_id}`;
  pool.query(queryText2, (err, result) => {
    artistName = result.rows[0].name;
  });
  let queryText = `SELECT * FROM songs WHERE artist_id=${artist_id}`;
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let songData = { songs: result.rows, artist: artistName };
    response.render("display-all-songs", songData);
  });
});

//VIEW CREATE NEW PLAYLIST PAGE
app.get("/playlist/new", (request, response) => {
  response.render("new-playlist");
});

//CAPTURES NEW PLAYLIST DATA AND DISPLAYS IT
app.post("/playlist/new", (request, response) => {
  let queryText = `INSERT INTO playlist (name) VALUES ('${request.body.name}') RETURNING *`;
  pool.query(queryText, (err, result) => {
    let artistObj = result.rows[0];
    console.log(artistObj);
    // response.render("display-one-artist", artistObj);
  });
});

//VIEW ADD NEW SONG TO PLAYLIST PAGE
app.get("/playlist/:plid/newsong", (request, response) => {
  let plid = request.params.plid;
  let plName;
  let queryText = `SELECT name FROM playlist WHERE id = ${plid}`;
  pool.query(queryText, (err, result) => {
    plName = result.rows[0].name;
    queryText = `SELECT songs.id, songs.title, songs.album, artists.name FROM songs JOIN artists ON (artists.id = songs.artist_id) ORDER BY songs.id ASC`;
    pool.query(queryText, (err, result) => {
      let obj = {
        songsArr: result.rows,
        pl_id: plid,
        pl_name: plName,
      };
      // console.log(obj);
      response.render("playlist-add-song", obj);
    });
  });
});

//CAPTURES NEW PLAYLIST SONG DATA AND DISPLAYS IT
app.post("/playlist/:plid", (request, response) => {
  // console.log(request.body);
  let playlistId = parseInt(request.body.plid);
  let songStr = request.body.song_selected;
  let res = songStr.split(". ");
  let selectedSongId = parseInt(res[0]);
  // console.log(selectedSongId);
  let queryText = `SELECT song_id FROM playlist_song WHERE playlist_id=${playlistId}`;
  pool.query(queryText, (err, result) => {
    let songArr = result.rows;
    // console.log(songArr);
    let songExists = songArr.find((ele) => {
      return ele.song_id === selectedSongId;
    });
    // console.log(songExists);
    if (songExists) {
      let plName;
      queryText = `SELECT name FROM playlist WHERE id = ${playlistId}`;
      pool.query(queryText, (err, result) => {
        plName = result.rows[0].name;
        queryText = `SELECT songs.id, songs.title, songs.album, artists.name FROM songs JOIN artists ON (artists.id = songs.artist_id) ORDER BY songs.id ASC`;
        pool.query(queryText, (err, result) => {
          let obj = {
            songsArr: result.rows,
            pl_id: playlistId,
            pl_name: plName,
            comments:
              "Song already exists in playlist. Please select an alternative.",
            defaultVal: songStr,
          };
          // console.log(obj);
          response.render("playlist-add-song", obj);
        });
      });
    } else {
      queryText = `INSERT INTO playlist_song (playlist_id, song_id) VALUES (${playlistId}, ${selectedSongId})`;
      pool.query(queryText, (err, results) => {
        // console.log(result.rows);
        response.redirect("http://127.0.0.1:3000/playlist/" + playlistId);
      });
    }
  });
});

//DISPLAY SINGULAR PLAYLIST DETAILS BASED ON PLAYLIST ID
app.get("/playlist/:plid", (request, response) => {
  let plid = request.params.plid;
  let queryText = `SELECT playlist_song.playlist_id, songs.title, songs.id FROM playlist_song JOIN songs ON (playlist_song.song_id = songs.id) WHERE playlist_song.playlist_id=${plid}`;
  console.log(queryText);
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let songsArr = result.rows;
    queryText = `SELECT name FROM playlist WHERE id = ${plid}`;
    pool.query(queryText, (err, result) => {
      plName = result.rows[0].name;
      let obj = {
        songsArr: songsArr,
        plName: plName
      };
      console.log(obj);
      response.render("display-one-playlist", obj);
    });
  });
});

//------------------------------
//-----LISTEN ON PORT 3000------
//------------------------------

const server = app.listen(3000, () => console.log("Tuning in to port 3000"));

let onClose = function () {
  console.log("closing");
  server.close(() => {
    console.log("Process terminated");
    pool.end(() => console.log("Shut down db connection pool"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
