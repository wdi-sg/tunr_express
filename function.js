const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const express = require('express');
const app = express();

const SALT = "saltcookie";
// Initialise postgres client
const configs = {
  user: 'jessica',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};
app.use(cookieParser());
const pool = new pg.Pool(configs);

/**
 * ===================================
 * Functions
 * ===================================
 */

module.exports.addArtistPage = (request, response) => {
    response.render("new");
}
module.exports.addArtist = (request,response) =>{
     let text = 'INSERT INTO artists (name, photo_url, nationality) values($1, $2, $3) returning id';
    let values = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(text, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let id = res.rows[0].id;
        let path = '/artists/'+id;
        response.redirect(path);
    });
}
module.exports.showArtist = (request, response)=>{
    let queryText = "SELECT * FROM artists WHERE id=$1";
    let values = [request.params.id];
    pool.query(queryText,values,(err,res)=>{
        if(err){
            console.log(err);
        }else{
        response.render("showArtist",res.rows[0]);
        }
    })
}
module.exports.showArtistSongs = (request,response)=>{
            let queryText = 'SELECT * FROM songs WHERE artist_id=$1';
            let values = [request.params.id];
            pool.query(queryText, values, (err, res)=>{
                const data = {
                    songs: res.rows
                }
                response.render("artistSongs", data);
            })
};
module.exports.showArtists = (request,response)=>{
            let queryText = 'SELECT * FROM artists ORDER BY id asc';
            pool.query(queryText, (err, res)=>{
                const data = {
                    artists: res.rows
                }
                response.render("home", data);
            })
}
module.exports.editArtist = (request,response)=>{
    let queryText = 'SELECT * FROM artists WHERE id=$1';
    let values = [request.params.id];
    pool.query(queryText,values, (err,res)=>{
        response.render("editArtist",res.rows[0]);
    })
}
module.exports.storeEditArtist = (request,response)=>{
     let queryText = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';
     let values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id];
     console.log("Here");
     pool.query(queryText, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let path ="/artists/"+request.params.id;
        response.redirect(path);
     });
}
module.exports.deleteArtist = (request,response)=>{
     let queryText = `DELETE FROM artists WHERE id=$1`;
     let values=[request.params.id];
     pool.query(queryText,values, (err,res)=>{
        if(err){
            console.log(err);
        }
      console.log('DELETED');
      response.redirect('/');
    });
  };


module.exports.addPlayListPage = (request, response)=>{
        response.render("newPlaylist");
}
module.exports.addPlayList = (request,response)=>{
     let text = 'INSERT INTO playlist (name) values($1) returning id';
    let values = [request.body.name];
    pool.query(text, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let id = res.rows[0].id
        let path = '/playlists/'+id;
        response.redirect(path);
    });
}
module.exports.showPlayList = (request, response)=>{

    let text = 'SELECT * FROM playlist WHERE id=$1';
    let values = [request.params.id];
    pool.query(text, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let text2 = `SELECT * FROM songs INNER JOIN playlist_songs ON(songs.id =playlist_songs.song_id ) WHERE playlist_songs.playlist_id=$1`;
            pool.query(text2, values, (error,result)=>{
        if(error){
            console.log(error);
        }
        const data = {
            name : res.rows[0].name,
            id : request.params.id,
            songs: result.rows
        }
        response.render('playlistPage', data);
    });
    });
}
module.exports.showPlayLists = (request, response)=>{
 let text = 'SELECT * FROM playlist';
    pool.query(text,(err,res)=>{
        if(err){
            console.log(err);
        }
        const data ={
            playlists:res.rows
        };
        response.render('listPlaylist', data);
    });
}
module.exports.newPlaylistSongPage = (request,response)=>{
    let text = 'SELECT * FROM songs';

    pool.query(text, (err,res)=>{
        if(err){
            console.log(err);
        }
        const data = {
            songs:res.rows,
            id: request.params.id
        }
        response.render("newPlaylistSongPage",data);
    });
}
//GET PLAYLIST ID AND SONG ID AND PUT IN THE PLAYLIST SONG TABLE
module.exports.addPlayListSongs = (request, response)=>{
         let text = 'INSERT INTO playlist_songs ( song_id, playlist_id) values($1, $2)';
    let values = [request.body.songs, request.params.id];
    console.log(request.body.songs);
    pool.query(text, values, (err,res)=>{
        if(err){
            console.log(err);
        }

        let path = '/playlists/'+request.params.id;
        response.redirect(path);
    });
}
module.exports.displaySongsToAddArtist = (request,response)=>{
    response.render('addSongs');
}
module.exports.addSongsToArtist = (request,response)=>{

}


module.exports.registerUserPage = (request,response)=>{
    response.render("registerUserPage");
}
module.exports.registerUser = (request,response)=>{
    let insertQueryText = `INSERT INTO users(username, password) VALUES($1,$2) RETURNING id`;
    let hashPWD = sha256(request.body.password+SALT);
    let values = [request.body.username,hashPWD];
    pool.query(insertQueryText, values, (err,res)=>{
        if( err ){
      console.log(err);
    }else{
    let user_id = res.rows[0].id;
    let hashedCookie = sha256(SALT+user_id);
    response.cookie("username", request.body.username);
    response.cookie("loggedIn", hashedCookie);
    response.cookie("userId", user_id);
    response.redirect('/');
    }
    });
}
module.exports.loginPage = (request,response)=>{
    response.render("loginPage");
}
module.exports.loginUser = (request,response)=>{
    let queryText = `SELECT * FROM users WHERE username=$1`;
    let values = [request.body.username];
    pool.query(queryText, values, (err,res)=>{
        if( err ){
      console.log(err);
    }else{
    let hashPWD = sha256(request.body.password+SALT);
    if(hashPWD===res.rows[0].password){
        let user_id = res.rows[0].id;
        let hashedCookie = sha256(SALT+user_id);
        response.cookie("username", request.body.username);
        response.cookie("loggedIn", hashedCookie);
        response.cookie("userId", user_id);
        response.redirect('/');
    }
    else{
        response.send("Wrong password");
    }
    }
    });
}