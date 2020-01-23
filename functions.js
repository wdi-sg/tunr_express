const React = require("react");
const pg = require("pg");
const configs = {
  user: "benn",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432
};

const sha256 = require("js-sha256");
const pool = new pg.Pool(configs);
const SALT = "HAHA";

module.exports.showArtists = (request, response) => {
  let query = "SELECT * from artists";
  let userName = request.cookies.username;
  pool.query(query, (err, result) => {
    if (err) {
      response.send("error");
    } else {
      const data = {
        artists: result.rows,
        username: request.cookies.username
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
        artists: result.rows[0],
        username: request.cookies.username
      };
      response.render("home", data);
    }
  });
};

module.exports.addArtistPage = (request, response) => {
  const data = {
    username: request.cookies.username
  };
  response.render("new", data);
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
        artists: result.rows[0],
        username: request.cookies.username
      };
      response.render("edit", data);
    }
  });
};

module.exports.addSongPage = (request, response) => {
  const query = "SELECT * FROM ARTISTS";
  pool.query(query, (err, result) => {
    const data = {
      artists: result.rows,
      username: request.cookies.username
    };
    response.render("newSong", data);
  });
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
            songs: songs,
            username: request.cookies.username
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
  const artistId = request.body.id;
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

module.exports.showPlaylists = (request, response) => {
  const query = "SELECT * from playlist";
  pool.query(query, (err, result) => {
    const data = {
      playlists: result.rows,
      username: request.cookies.username
    };
    response.render("playlists", data);
  });
};

module.exports.showPlaylist = (request, response) => {
  const playlistID = request.params.id;
  const values = [playlistID];
  const query = `SELECT songs.id, songs.title, songs.preview_link
                 FROM songs
                 INNER JOIN playlist_song
                 on (songs.id = playlist_song.song_id)
                 WHERE playlist_song.playlist_id = $1`;
  const playlistNameQuery = "SELECT * from playlist where id = $1";
  pool.query(playlistNameQuery, values, (err, result) => {
    console.log(result.rows);
    const playlistName = result.rows[0];
    pool.query(query, values, (err, result) => {
      const data = {
        playlistName: playlistName,
        playlistSongs: result.rows,
        username: request.cookies.username
      };
      response.render("playlist", data);
    });
  });
};

module.exports.showSongFormForPlaylist = (request, response) => {
  const query = "SELECT * from songs";
  pool.query(query, (err, result) => {
    const data = {
      songs: result.rows,
      playlistID: request.params.id,
      username: request.cookies.username
    };
    response.render("newPlaylistSong", data);
  });
};

module.exports.makeNewPlaylist = (request, response) => {
  const playlistName = request.body.playlist_name;
  const values = [playlistName];
  const query = "INSERT into playlist (name) VALUES($1)";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/playlists");
    }
  });
};

module.exports.addSongIntoPlaylistSong = (request, response) => {
  const playlistID = parseInt(request.params.id);
  const songID = parseInt(request.body.song_id);
  const values = [songID, playlistID];
  const query = "SELECT * from playlist_song";
  let duplicate;
  pool.query(query, (err, result) => {
    for (let i = 0; i < result.rows.length; i++) {
      const innerSongID = parseInt(result.rows[i].song_id);
      const innerPlaylistID = parseInt(result.rows[i].playlist_id);
      if (songID === innerSongID && playlistID === innerPlaylistID) {
        duplicate = true;
      } else {
        const nameQuery = "SELECT * from songs";
        pool.query(nameQuery, (err, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            if (result.rows[i].title === result.rows[songID - 1].title) {
              duplicate = true;
            }
          }
        });
      }
    }

    if (duplicate) {
      const data = {
        errorMessage: "Data already exists!"
      };
      response.render("404", data);
    }

    if (!duplicate) {
      const addSongQuery =
        "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)";
      pool.query(addSongQuery, values, (err, result) => {
        if (err) console.log("err");
        else {
          response.redirect("/playlists/" + playlistID);
        }
      });
    }
  });
};

module.exports.sortArtists = (request, response) => {
  const type = request.params.type;
  if (type === "name") {
    const query = `SELECT * from artists
    ORDER BY name`;
    pool.query(query, (err, result) => {
      const data = {
        artists: result.rows,
        username: request.cookies.username
      };
      response.render("home", data);
    });
  } else if (type === "dateCreated") {
    const query = `SELECT * from artists
    ORDER BY id`;
    pool.query(query, (err, result) => {
      const data = {
        artists: result.rows,
        username: request.cookies.username
      };
      response.render("home", data);
    });
  }
};

module.exports.registerUser = (request, response) => {
  let userExists;
  const username = request.body.username;
  const hashedPassword = sha256(request.body.password);

  const query = "SELECT * from users";

  pool.query(query, (err, result) => {
    if (err) console.log(err);
    else {
      for (let i = 0; i < result.rows.length; i++) {
        if (username === result.rows[i].name) {
          userExists = true;
        }
      }
      if (userExists) {
        const data = {
          errorMessage:
            "User already exists in database! Please choose a different username."
        };
        response.render("404", data);
      }
      if (!userExists) {
        const values = [username, hashedPassword];
        const registerQuery =
          "INSERT into users (name, password) VALUES ($1, $2) RETURNING id";
        pool.query(registerQuery, values, (err, result) => {
          if (err) console.log(err);
          else {
            const userID = result.rows[0].id;
            const hashedCookie = sha256(SALT + userID);
            response.cookie("username", username);
            response.cookie("loggedIn", hashedCookie);
            response.cookie("userID", userID);
            response.redirect("/");
          }
        });
      }
    }
  });
};

module.exports.loginUser = (request, response) => {
  console.log(request.body);
  const username = request.body.username;
  const password = request.body.password;
  const values = [username];
  const loginQuery = "SELECT * from users where name = $1";
  pool.query(loginQuery, values, (err, result) => {
    if (err) console.log(err);
    else {
      if (result.rows.length !== 0) {
        const user = result.rows[0];
        if (sha256(password) === user.password) {
          const hashedCookie = sha256(SALT + user.id);
          response.cookie("username", user.name);
          response.cookie("loggedIn", hashedCookie);
          response.cookie("userID", user.id);
          response.redirect("/");
        } else {
          const data = {
            errorMessage: "Wrong password?"
          };
          response.render("404", data);
        }
      } else {
        const data = {
          errorMessage: "There's no such user!"
        };
        response.render("404", data);
      }
    }
  });
};

module.exports.clearCookies = (request, response) => {
  response.clearCookie("loggedIn");
  response.clearCookie("userID");
  response.clearCookie("username");
  response.redirect("/");
};

module.exports.showFavoritesForm = (request, response) => {
  if (request.cookies.loggedIn !== undefined) {
    const query = "SELECT * from songs";
    pool.query(query, (err, result) => {
      const data = {
        songs: result.rows
      };
      response.render("favoritesform", data);
    });
  } else {
    const data = {
      errorMessage: "You need to be logged in to add favorites!"
    };
    response.render("404", data);
  }
};

module.exports.showFavorites = (request, response) => {
  if (request.cookies.loggedIn === undefined) {
    const data = {
      errorMessage: "You need to be logged in to view favorites!"
    };
    response.render("404", data);
  }
  const userID = request.cookies.userID;
  const values = [userID];
  const query = `
      SELECT songs.id, songs.title, songs.preview_link
      FROM SONGS
      INNER JOIN favorites
      on (songs.id = favorites.song_id)
      WHERE favorites.user_id = $1;`;
  pool.query(query, values, (err, result) => {
    const favorites = result.rows;
    const data = {
      favorites: favorites,
      username: request.cookies.username
    };
    response.render("favorites", data);
  });
};

module.exports.addFavorites = (request, response) => {
  const songID = request.body.song_id;
  const userID = request.cookies.userID;
  const values = [songID, userID];
  const query = "INSERT into favorites (song_id, user_id) VALUES ($1, $2)";
  pool.query(query, values, (err, result) => {
    if (err) console.log(err);
    else {
      response.redirect("/");
    }
  });
};
