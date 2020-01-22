const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jessica',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
/**
 * ===================================
 * Functions
 * ===================================
 */

const addArtistPage = (request, response) => {
    response.render("new");
}
const addArtist = (request,response) =>{
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
const showArtist = (request, response)=>{
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
const showArtistSongs = (request,response)=>{
            let queryText = 'SELECT * FROM songs WHERE artist_id=$1';
            let values = [request.params.id];
            pool.query(queryText, values, (err, res)=>{
                const data = {
                    songs: res.rows
                }
                response.render("artistSongs", data);
            })
};
const showArtists = (request,response)=>{
            let queryText = 'SELECT * FROM artists ORDER BY id asc';
            pool.query(queryText, (err, res)=>{
                const data = {
                    artists: res.rows
                }
                response.render("home", data);
            })
}
const editArtist = (request,response)=>{
    let queryText = 'SELECT * FROM artists WHERE id=$1';
    let values = [request.params.id];
    pool.query(queryText,values, (err,res)=>{
        response.render("editArtist",res.rows[0]);
    })
}
const storeEditArtist = (request,response)=>{
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
const deleteArtist = (request,response)=>{
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
/////////////////PART 2//////////////////
const addPlayListPage = (request, response)=>{
        response.render("newPlaylist");
}
const addPlayList = (request,response)=>{
     let text = 'INSERT INTO playlist (name) values($1) return id';
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
const showPlayList = (request, response)=>{

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
const showPlayLists = (request, response)=>{
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
const newPlaylistSongPage = (request,response)=>{
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
const addPlayListSongs = (request, response)=>{
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
const displaySongsToAddArtist = (request,response)=>{
    response.render('addSongs');
}
const addSongsToArtist = (request,response)=>{

}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', showArtists);
app.get('/new', addArtistPage);
app.post('/', addArtist);
app.get('/artist/:id/songs/new', displaySongsToAddArtist);
app.post('/artist/:id/songs', addSongsToArtist);
app.get('/artists/:id/songs',showArtistSongs);
app.get('/artists/:id/edit',editArtist);
app.put('/artists/:id',storeEditArtist);
app.get('/artists/:id',showArtist);
app.delete('/artists/:id', deleteArtist);
//////////////////PLAYLIST/////////////////
app.get('/playlists/new', addPlayListPage);
app.get('/playlists/:id', showPlayList)
app.get('/playlists', showPlayLists)
app.post('/playlists', addPlayList );
app.get('/playlists/:id/newsong', newPlaylistSongPage);
app.get('/playlists/:id/newsong', newPlaylistSongPage);
app.post('/playlists/:id', addPlayListSongs);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);