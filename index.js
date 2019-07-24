console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'marcus',
  password: 'happytreefriends',
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
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//public folder for CSS
app.use(express.static('public'))
// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */
//copy paste this code to create table quickly
// psql -d tunr_db -U marcus -f tables.sql
// psql -d tunr_db -U marcus -f songs.sql
// psql -d tunr_db -U marcus -f artist_data.sql


//artist index
app.get('/artists', (request, response) => {
  //get info from database on artists
  pool.query('SELECT * FROM artists', (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }else{
      var dataSet = {
        artists: result.rows
      }
      response.render('artist-index', dataSet);
    }
  })
});

//artist show feature
app.get('/artist/:id/songs', (request, response) => {
  //get request params info on which artist was clicked
  var input = 'SELECT * FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input,values,(error, result) => {
    if (error) {
      return console.error('Error executing query', err.stack)
    }else{
      var secondInput = 'SELECT * FROM songs where artist_id=$1';
      var secondValues = [result.rows[0].id];
      pool.query(secondInput,secondValues,(err,res)=>{
        if (err){
          return console.error('Error executing query', error.stack)
        }else{
          var thirdInput = 'SELECT * FROM playlist';
          pool.query(thirdInput,(err1,res1)=>{
            if (err1){
              return console.error('Error executing query', error.stack)
            }else{
              var dataSet = {
                artistid: request.params.id,
                artistinfo: result.rows[0].name,
                artists: res.rows,
                playlist: res1.rows
              }
              response.render('artist-show-feature', dataSet);
            }
          }
        )}
      }
    )}
  });
});
//new song for the artist, send form to user
app.get('/artist/:id&:name/songs/new', (request,response)=>{
  var input = 'SELECT * FROM artists;'
  pool.query(input,(error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else{
      var dataSet = {
        artist: request.params,
        artists: result.rows
      }
      response.render('newsongpage', dataSet)
    }
  })
})

app.post('/artist/:id/songs', (request,response)=>{
  console.log(request.body)
  console.log(request.params.id)
  if (request.body.artist === ''){
    var input = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5)';
    var values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.params.id]
    pool.query(input,values,(error,result)=>{
      if (error){
        return console.error('Error executing query', error.stack)
      }else{
        response.redirect('/artists')
      }
    })
  }else {
    var input = 'SELECT * FROM artists WHERE name=$1'
    var values = [request.body.artist]
    pool.query(input,values,(error,result)=>{
      if (error){
        return console.error('Error executing query', error.stack)
      }else{
        var input = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5)';
        var values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, result.rows[0].id]
        pool.query(input,values,(err,res)=>{
          if (error){
            return console.error('Error executing query', error.stack)
          }else{
            response.redirect('/artists')
          }
        })
      }
    })
  }
})
//create new artist in database
app.get('/artist/create', (request, response) => {
  response.render('create-artist');
});

app.post('/artist/', (request,response)=>{
  var input = 'INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3)';
  var values = [request.body.name,request.body.photo_url,request.body.nationality]
  pool.query(input,values,(err,result)=>{
    if (err){
      return console.error('Error executing query', error.stack)
    }else{
      response.redirect('/artists')
    }
  })
})
//edit form to edit artist info
app.get('/artist/:id/edit',(request,response)=>{
  var input = 'SELECT * FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input, values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var dataSet = {
        artist: result.rows
      }
      response.render("edit-artist",dataSet)
    }
  })
})
//get the database info about selected artist and insert new update
app.put('/artist/:id',(request,response)=>{
  var input = 'SELECT * FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input, values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var secondInput = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 where id=$4'
      var secondValues = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id]
      pool.query(secondInput,secondValues,(err,res)=>{
        if (error){
          return console.error('Error executing query', error.stack)
        }else{
          var redirectLink = '/artist/' + request.params.id + '/showfeature'
          response.redirect(redirectLink)
        }
      })
    }
  })
})
//delete the artist
app.delete('/artist/:id',(request,response)=>{
  var input = 'DELETE FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input, values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var redirectLink = '/artists'
      response.redirect(redirectLink)
    }
  })
});

//display all playlist
app.get('/playlist',(request,response)=>{
  var input = 'SELECT * from playlist;'
  pool.query(input, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      console.log(result.rows)
      var dataSet = {
        playlist: result.rows
      }
      // response.send("it works!")
      response.render('playlistpage',dataSet)
    }
  })
})

//create new playlist
app.get('/playlist/new',(request,response)=>{
  response.render('newplaylist')
})

//insert new playlist into playlit table
app.post('/playlist',(request,response)=>{
  var input = 'INSERT INTO playlist (playlist_name) VALUES ($1)';
  var values = [request.body.playlist_name]
  pool.query(input,values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      response.redirect('/playlist')
    }
  })
})

//display playlist songs
app.get('/playlist/:id/songs',(request,response)=>{
  var input = 'SELECT * from playlist_song WHERE playlist_id=$1;';
  var values = [request.params.id]
  pool.query(input,values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var secondInput = 'SELECT * from playlist WHERE id=$1;';
      var secondValues = [request.params.id]
      pool.query(secondInput,secondValues,(err,res)=>{
        if (error){
          return console.error('Error executing query', error.stack)
        }else{
          var dataSet ={
            playname: res.rows[0].playlist_name,
            data : result.rows
          }
          response.render('playlistsongpage',dataSet)
        }
      })
    }
  })
})
//adding to playlist
app.post('/playlist/add',(request,response)=>{
  var input = 'SELECT song_title,album FROM playlist_song where playlist_id=$1'
  var values = [request.body.playlist]
  pool.query(input,values,(err,res)=>{
    if (err){
      return console.error('Error executing query', error.stack)
    }else{
      let found = res.rows.find((obj)=>{
        return obj.song_title === request.body.title && obj.album === request.body.album
      })
      if (found){
        response.send('duplicate')
      }else{
        var secondInput = 'INSERT INTO playlist_song (playlist_id,album,song_title,preview_link) VALUES ($1,$2,$3,$4)';
        var secondValues = [request.body.playlist,request.body.album,request.body.title,request.body.preview_link,];
        pool.query(secondInput,secondValues,(error,result)=>{
          if (error){
            return console.error('Error executing query', error.stack)
          }else{
            response.send("working")
          }
        })
      }
    }
  })
})

//mass adding to playlist if any or some of the playlist have duplicates, reject them
app.post('/playlist/massadd',(request,response)=>{

  var array=[];
  var duplicateArray=[];

  if (request.body.playlistarray instanceof Array){
    array = request.body.playlistarray.map((obj)=>{return obj})
  }else{
    array.push(request.body.playlistarray)
  }
  // console.log(array)
  for (var i = 0; i < array.length; i++){
    let foundStatus=false;
    var input = 'SELECT * FROM playlist_song where playlist_id=$1'
    let value = [array[i]]
    pool.query(input,value,(error,result)=>{
      if(error){
        return console.error('Error executing query', error.stack)
      }else{
        for (var j = 0; j < result.rows.length; j++){
          if(result.rows[j].song_title === request.body.title && result.rows[j].album === request.body.album){
            let object = {
              title: request.body.title,
              album: request.body.album,
              id: value
            }
            foundStatus=true;
            duplicateArray.push(object)
            break;
          }
        }
      }
      if (!foundStatus){
        // console.log(value)
        var secondInput = 'INSERT INTO playlist_song (playlist_id,album,song_title,preview_link) VALUES($1,$2,$3,$4)'
        var secondValues = [value[0],request.body.album,request.body.title,request.body.preview_link]
        pool.query(secondInput,secondValues,(err,res)=>{
          if(err){
            return console.error('Error executing query', err.stack)
          }
        })
      }
      // console.log("~~~~~~~~~~~result rows~~~~~~~~~~~")
      // console.log(foundStatus)
      // console.log("~~~~~~~~~~~result rows~~~~~~~~~~~")
      console.log(duplicateArray)
    })
  }
  if (duplicateArray){
    var displayDuplicate=[]
    for (var k = 0; k < duplicateArray.length; k++){
      var text = 'SELECT * FROM playlist WHERE id=$1'
      let textValue = [duplicateArray[k]]
      pool.query(text,textValue,(error,result)=>{
        if(error){
          return console.error('Error executing query', error.stack)
        }else{
          console.log(result.rows)
          let object = {
            title:duplicateArray[k].title,
            album:duplicateArray[k].album,
            playlist:result.rows[0].playlist_name
          }
          displayDuplicate.push(object)
        }
      })
    }
    response.send(duplicateArray)
  }else{
    response.send("ok")
  }
})

//code to select the song information based on playlist_songs
// SELECT * FROM songs INNER JOIN playlist_song ON (songs.title = playlist_song.song_title AND songs.album = playlist_song.album) where playlist_song.playlist_id = 1;
/**
 * ===================================
 * Listen to requests on port 3000 - Don't touch this part. It's working as it is!
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
