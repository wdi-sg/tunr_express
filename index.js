const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");
const app = express();
const lodash = require("lodash");
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

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static("public"));

const sha256 = require("js-sha256");

//----------------------------------
//-------------ROUTES---------------
//----------------------------------

function parseSingleQuote(obj) {
  for (const key in obj) {
    obj[key] = obj[key].replace("'", "''");
  }
  return obj;
}

//----------------------------------
//-----------AUTHENTICATION---------
//----------------------------------

app.get("/register", (request, response) => {
  response.render("register");
});

app.post("/register", (request, response) => {
  console.log(request.body);
  let newUsername = request.body.username;
  let newPw = sha256(request.body.password);
  let queryText = `INSERT INTO users (username, pw) VALUES ('${newUsername}' , '${newPw}') RETURNING *`;
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let obj = {
      comments: "Registration successful! Please proceed to log-in.",
    };
    response.render("register-success", obj);
  });
});

app.get("/", (request, response) => {
  response.render("auth-MAIN");
});

app.post("/", (request, response) => {
  console.log(request.body);
  if (request.body.username !== "" && request.body.password !== "") {
    let loginUsername = request.body.username;
    let loginPw = sha256(request.body.password);
    let queryText = `SELECT id FROM users WHERE username='${loginUsername}' AND pw='${loginPw}'`;
    pool.query(queryText, (err, result) => {
      console.log(result.rows);
      if (result.rows.length > 0) {
        let viewCount;
        let timestamp = Date.now();
        if (
          !request.cookies ||
          !request.cookies.viewCountBrow ||
          !request.cookies.timestampBrow
        ) {
          viewCount = 1;
        } else if (
          timestamp > parseInt(request.cookies.timestampBrow) + 604800000 &&
          request.cookies.viewCountBrow >= 50
        ) {
          viewCount = 50;
        } else {
          viewCount = parseInt(request.cookies.viewCountBrow);
          viewCount = viewCount + 1;
        }
        response.cookie("loggedin", true);
        response.cookie("viewCountBrow", viewCount);
        response.cookie("timestampBrow", timestamp);
        response.render("home");
      } else {
        let obj = {
          comments: "Sorry, user not found. Please try again.",
        };
        response.render("auth-MAIN", obj);
      }
    });
  } else {
    let obj = {
      comments: "Please complete all log-in fields.",
    };
    response.render("auth-MAIN", obj);
  }
});

app.get("/logout", (request, response) => {
  let obj = {
    comments: "Logout success!",
  };
  response.clearCookie("loggedin");
  response.render("logout", obj);
});

//VIEW HOME PAGE/ DASHBOARD
app.get("/home", (request, response) => {
  //Set view count cookie
  let viewCount;
  let timestamp = Date.now();
  console.log(request.cookies);
  console.log(request.cookies.viewCountBrow);

  if (
    !request.cookies ||
    !request.cookies.viewCountBrow ||
    !request.cookies.timestampBrow
  ) {
    viewCount = 1;
  } else if (
    timestamp > parseInt(request.cookies.timestampBrow) + 604800000 &&
    request.cookies.viewCountBrow >= 50
  ) {
    viewCount = 50;
  } else {
    viewCount = parseInt(request.cookies.viewCountBrow);
    viewCount = viewCount + 1;
  }
  response.cookie("viewCountBrow", viewCount);
  response.cookie("timestampBrow", timestamp);
  response.render("home");
});

//----------------------------------
//-----------ARTIST ROUTES----------
//----------------------------------

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

//CAPTURE AND DISPLAY EDITED ARTIST DETAILS
app.post("/artists/:id/edit", (request, response) => {
  let id = request.params.id;
  let queryText = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id=${id} RETURNING *`;
  console.log(queryText);
  pool.query(queryText, (err, result) => {
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

//----------------------------------
//-----------SONG ROUTES------------
//----------------------------------

//VIEW ALL SONGS
app.get("/songs", (request, response) => {
  let queryText =
    "SELECT songs.id, songs.title, artists.name FROM songs JOIN artists ON (artists.id = songs.artist_id) ORDER BY songs.title ASC";
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let obj = {
      songsArr: result.rows,
    };
    response.render("display-all-songs-list", obj);
  });
});

//DISPLAY FORM TO ADD NEW SONG
app.get("/songs/new", (request, response) => {
  let queryText = `SELECT * FROM artists ORDER BY name`;
  pool.query(queryText, (err, result) => {
    // console.log(result.rows);
    let obj = {
      artistArr: result.rows,
    };
    response.render("new-song", obj);
  });
});

//CAPTURE NEW SONG DATA AND DISPLAY NEWLY ADDED SONG
app.post("/songs/new", (request, response) => {
  console.log(request.body);
  obj = parseSingleQuote(request.body);
  let artist_id = parseInt(request.body.artist_id);
  let queryText = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ('${obj.title}', '${obj.album}', '${obj.preview_link}', '${obj.artwork}', ${artist_id}) RETURNING *`;
  console.log(queryText);
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let link = "http://127.0.0.1:3000/songs/" + result.rows[0].id;
    response.redirect(link);
  });
});

//DISPLAY PLAYLIST OPTIONS FOR EACH SONG
app.get("/songs/:sid/add", (request, response) => {
  let songId = parseInt(request.params.sid);
  let queryText = `SELECT playlist_id FROM playlist_song WHERE song_id=${songId}`;
  //ensures that only playlist(s) that do not have the song already are displayed
  pool.query(queryText, (err, result) => {
    if (!lodash.isEmpty(result.rows)) {
      let inPlaylist = result.rows;
      let string = `id != ${inPlaylist[0].playlist_id}`;
      for (let i = 1; i < inPlaylist.length; i++) {
        string = string + ` AND id != ${inPlaylist[i].playlist_id}`;
      }
      queryText = `SELECT * FROM playlist WHERE ${string}`;
      console.log(queryText);
      pool.query(queryText, (err, result) => {
        let obj = {
          plArr: result.rows,
          songId: songId,
        };
        response.render("song-add-playlist", obj);
      });
    } else {
      queryText = `SELECT * FROM playlist ORDER BY name ASC`;
      pool.query(queryText, (err, result) => {
        let obj = {
          plArr: result.rows,
          songId: songId,
        };
        console.log(obj);
        response.render("song-add-playlist", obj);
      });
    }
  });
});

//VIEW ONE SONG
app.get("/songs/:sid", (request, response) => {
  let songId = parseInt(request.params.sid);
  let queryText = `SELECT songs.id, songs.title, songs.album, songs.preview_link, songs.artwork, songs.artist_id, artists.name FROM songs JOIN artists ON (songs.artist_id = artists.id) WHERE songs.id=${songId}`;
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    response.render("display-one-song", result.rows[0]);
  });
});

//----------------------------------
//----------PLAYLIST ROUTES---------
//----------------------------------

//CAPTURE SONG-ADD-PLAYLIST DATA AND DISPLAY ALL PLAYLISTS
app.post("/playlist", (request, response) => {
  console.log(request.body);
  let obj = request.body;
  for (let i = 0; i < obj.playlist_id.length; i++) {
    let queryText = `INSERT INTO playlist_song (playlist_id, song_id) VALUES (${obj.playlist_id[i]}, ${obj.song_id}) RETURNING *`;
    pool.query(queryText, (err, result) => {
      console.log(result.rows);
      return;
    });
  }
  response.redirect("http://127.0.0.1:3000/playlist");
});

//VIEW ALL PLAYLISTS
app.get("/playlist", (request, response) => {
  let queryText = "SELECT * FROM playlist ORDER BY name ASC";
  pool.query(queryText, (err, result) => {
    console.log(result.rows);
    let obj = {
      plArr: result.rows,
    };
    response.render("display-all-playlists", obj);
  });
});

//VIEW CREATE NEW PLAYLIST PAGE
app.get("/playlist/new", (request, response) => {
  response.render("new-playlist");
});

//CAPTURES NEW PLAYLIST DATA AND DISPLAYS IT
app.post("/playlist/new", (request, response) => {
  let queryText = `INSERT INTO playlist (name) VALUES ('${request.body.name}')`;
  pool.query(queryText, (err, result) => {
    let artistObj = result.rows[0];
    console.log(artistObj);
    response.redirect("http://127.0.0.1:3000/playlist");
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
  let playlistId = parseInt(request.body.plid);
  let songStr = request.body.song_selected;
  let res = songStr.split(". ");
  let selectedSongId = parseInt(res[0]);
  let queryText = `SELECT song_id FROM playlist_song WHERE playlist_id=${playlistId}`;
  //Check if song already exists in playlist based on id
  pool.query(queryText, (err, result) => {
    let songArr = result.rows;
    let songExists = songArr.find((ele) => {
      return ele.song_id === selectedSongId;
    });
    //If song already exists in playlist, prompt user to select an alternative song
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
          response.render("playlist-add-song", obj);
        });
      });
    } else {
      queryText = `INSERT INTO playlist_song (playlist_id, song_id) VALUES (${playlistId}, ${selectedSongId})`;
      pool.query(queryText, (err, results) => {
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
        plName: plName,
      };
      console.log(obj);
      response.render("display-one-playlist", obj);
    });
  });
});

//DISPLAY COOKIE PLAYLIST
app.get("/cookieplaylist", (request, response) => {
  if (!request.cookies || !request.cookies.cookiepl) {
    response.send("The cookie playlist has no songs yet.");
  } else {
    let cookiepl = request.cookies.cookiepl;
    console.log(cookiepl);
    let cookieplArr = cookiepl.split("-");
    let string = `id = ${parseInt(cookieplArr[1])}`;
    for (let i = 2; i < cookieplArr.length; i++) {
      string = string + ` OR id = ${parseInt(cookieplArr[i])}`;
    }
    let queryText = `SELECT * FROM songs WHERE ${string}`;
    console.log(queryText);
    pool.query(queryText, (err, result) => {
      console.log(result.rows);
      let obj = {
        songsArr: result.rows,
      };
      response.render("display-cookiepl", obj);
    });
  }
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
