console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
// Initialise postgres client
const configs = {
  user: 'kenneththesheep',
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

//////cookie monster

const cookieParser = require('cookie-parser')
app.use(cookieParser());

///////////public express
app.use(express.static('public'))



////////varaibles
let reset=true;
let testadd=0;
/**
 * ===================================
 * Routes
 * ===================================
 */
////Blank page
app.get('/', (request, response) => {
    // get the currently set cookie
var visits = request.cookies['visits'];

// see if there is a cookie
if( visits === undefined ){

  // set a default value if it doesn't exist
  visits = 1;
}
else{

  // if a cookie exists, make a value thats 1 bigger
  visits = parseInt( visits ) + 1;
}
console.log(visits);
// set the cookie
response.cookie('visits', visits);
  // query database for all artist

  // respond with HTML page displaying all arist
  const visitString= (`You have visited the site ${visits} times.`)

   response.send(visitString);
});

////Blank page
app.get('/index', (request, response) => {
  // query database for all artist

  // respond with HTML page displaying all arist
  response.send('hello world');
});

////Go to Register Form
app.get('/register', (request, response) => {
  // query database for all artist

  // respond with HTML page displaying all arist
  response.render('register');
});


////Process Registration
app.post('/register', (request, response) => {
    const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("EERRRRRRRROR");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      // if the query ran wiothout errors
      console.log(result.rows[0]);
      var username = request.cookies['username'];
    var password=request.cookies['password'];
    if( username === undefined ){

      username = request.body.loginname;

    }
        if( password === undefined ){

      password = sha256(request.body.password);

    }
    response.cookie('username',username);
    response.cookie('password', password);
    const data = {};
          data.successMessage= "Congratulation on your successful login"
                                response.render('success', data);
    }
  };
        const queryString = 'SELECT * from users';

        pool.query(queryString,  (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {

                        const data={};

                        for (keys in result.rows)
                        {
                            if(request.body.loginname===result.rows[keys].name)
                            {
                                data.errorMessage= "User exists"
                                response.render('error', data);
                                return
                            }
                            //console.log(result.rows[keys].name);
                        }
                        //response.render("artist",data);
                            const encryptedPassword = sha256(request.body.password);
                            const queryString = "INSERT INTO users (name, password, encryptPassword) VALUES ($1, $2, $3) RETURNING id";

                            const input=[request.body.loginname, request.body.password, encryptedPassword];

                            console.log(input);
                            //response.send(input);

                            pool.query(queryString, input, whenQueryDone);
                    }
            });




});

////Go to Login Form
app.get('/login', (request, response) => {
  // query database for all artist

  // respond with HTML page displaying all arist
  response.render('login');
  //response.render('register');
});

////Go to Login Form
app.post('/login', (request, response) => {
  // query database for all artist

  // respond with HTML page displaying all arist
          const queryString = 'SELECT * from users';


          pool.query(queryString,  (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {

                        const data={};
                        let userFind=false;
                        for (keys in result.rows)
                        {

                            if(request.body.loginname===result.rows[keys].name)
                            {

                                userFind=true;

                            }
                            //console.log(result.rows[keys].name);
                        }
                        if(!userFind)
                        {

                                data.errorMessage= "User does not exists"
                                response.render('error', data);
                                return

                        }
                        const queryPasswordString = 'SELECT * from users WHERE name=($1)';
                        console.log(request.body.loginname);

                            const inputString=[request.body.loginname];
                            pool.query(queryPasswordString, inputString, (Passworderr, Passwordresult) =>
                            {

                                if (err)
                                    {
                                        console.error('query error:', Passworderr.stack);
                                        response.send( 'query error' );
                                    }
                                else
                                    {
                                        console.log("here");
                                        const data={};
                                        let userFind=false;
                                        console.log(result.rows);
                                        console.log(Passwordresult.rows);
                                        if( Passwordresult.rows[0].password === request.body.password)
                                        {

                                                  var username = request.cookies['username'];
                                            var password=request.cookies['password'];


                                              username = request.body.loginname;


                                              password = sha256(request.body.password);

                                            response.cookie('username',username);
                                            response.cookie('password', password);
                                            response.redirect('/');
                                            return;

                                        }
                                        const data2 = {};
                                        data2.errorMessage="Wrong Password"
                                            response.render('error', data2);




                                     }
                             });
                        }
            });
  //response.render('register');
});
////Show all Artists
app.get('/artists',(request,response)=>{

    const queryString = 'SELECT * from artists';

pool.query(queryString, (err, result) => {

  if (err) {
    console.error('query error:', err.stack);
    response.send( 'query error' );
  } else {
    //console.log('query result:', result);
    const data={};

    data.artist=result.rows;
    // redirect to home page

    // get the currently set cookie
var visits = request.cookies['visits'];
var overFifty=request.cookies['fifty'];
// see if there is a cookie
if( visits === undefined && reset=== true){

  // set a default value if it doesn't exist
  visits = 1;
  reset =false;

}
if( overFifty===undefined){
    overFifty=false;
}
if(parseInt(visits)<50 && reset === true)
{
      visits = 1;
      reset =false;

} else
if(parseInt(visits)>=50 && reset === true)
{
      visits = 50;
      reset =false;

}
else{

  // if a cookie exists, make a value thats 1 bigger
  visits = parseInt( visits ) + 1;
        reset =false;
  clearTimeout(fiveSecondResetTimeoutReference);

}
response.cookie('fifty',overFifty);
response.cookie('visits', visits);
  // query database for all artist
  clearTimeout(fiveSecondResetTimeoutReference);




  // respond with HTML page displaying all arist
  const visitString= (`You have visited the site ${visits} times.`)
data.visitString=visitString;
data.visitCount=visits;
var fiveSecondResetTimeoutReference = setTimeout(function() {

  reset=true;

}, 86400000);

    response.render("home",data);
    //response.send( data );
  }
});
    //response.render('home');
});


//////This goes to the form

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

/////////This is where input is manipulated for new artist
app.post('/artists',(request,response)=>{
    const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("EERRRRRRRROR");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      // if the query ran wiothout errors
      console.log(result.rows[0]);
      // response.send('HEY NEW DOOOGGGG::: '+ result.rows[0].id);

      let new_id = result.rows[0].id;
      let url= "/artists/"+new_id;
      response.redirect(url);
    }
  };

    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id";

    const input=[request.body.name, request.body.img, request.body.nationality];
    console.log(input);


    pool.query(queryString, input, whenQueryDone);

});

app.get('/artists/:id', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon
        console.log(typeof request.params.id);
        const queryString = 'SELECT * from artists WHERE id = ($1)';
        const input = [request.params.id]
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {

                        const data={};
                        data.artist=result.rows;
                        response.render("artist",data);
            //response.send( data );
                    }
            });
    });
//////form to edit
app.get('/artists/:id/edit',(request,response)=>{
    //console.log("enter edit")
    const data={}
    //response.send("Edit mode");
    const queryString = 'SELECT * from artists WHERE id = ($1)';
    const input = [request.params.id]
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {


                        data.artist=result.rows;
                        response.render("editArtist",data);
                        //response.send( data );
                    }
            });

})
//// process of edit

app.put('/artists/:id', (request,response)=>{


     const data={};
     console.log(request.body);
     const queryString= "UPDATE artists SET name= ($2) , photo_url= ($3), nationality= ($4) WHERE id = ($1)";
     const id=request.params.id;
    const input = [request.params.id, request.body.name, request.body.img, request.body.nationality];
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {


                        data.artist=result.rows;

                        //response.render("editArtist",data);
                        let url= "/artists/"+id;
                        response.redirect(url);
                        //response.send( data );
                    }
            });
})
///delete artist
//Accepts a request to delete
app.delete('/artists/:id', (request,response)=>{

     const queryString= "DELETE FROM artists WHERE id = ($1)";
     const id=request.params.id;
        const input = [request.params.id];
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {
                        response.redirect('/artists')
                    }
            });
    })


////Show all Artists
app.get('/songs',(request,response)=>{
    const queryString = 'SELECT * from songs';

pool.query(queryString, (err, result) => {

  if (err) {
    console.error('query error:', err.stack);
    response.send( 'query error' );
  } else {
    //console.log('query result:', result);
    const data={};

    data.songs=result.rows;
    // redirect to home page

    response.render("songhome",data);
    //response.send( data );
  }
});
    //response.render('home');
});

//////This goes to the form for songs

app.get('/songs/new', (request, response) => {
  // respond with HTML page with form to create new pokemon

      const queryString = 'SELECT * from artists';

pool.query(queryString, (err, result) => {

  if (err) {
    console.error('query error:', err.stack);
    response.send( 'query error' );
  } else {
    //console.log('query result:', result);
    const data={};

    data.artist=result.rows;
    // redirect to home page

    response.render('newSong', data);
    //response.send( data );
  }
});
});

app.post('/songs',(request,response)=>{
    const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("EERRRRRRRROR");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      // if the query ran wiothout errors
      console.log(result.rows[0]);
      // response.send('HEY NEW DOOOGGGG::: '+ result.rows[0].id);

      let new_id = result.rows[0].id;
      let url= "/songs/"+new_id;
      response.redirect(url);
    }
  };
    console.log(request.body);
    const queryString = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";

    const input=[request.body.title, request.body.album, request.body.img, request.body.preview_link, request.body.artist_id];
    console.log(input);


    pool.query(queryString, input, whenQueryDone);

});

app.get('/songs/:id', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon
        console.log(typeof request.params.id);

        const data={};
        var username = request.cookies['username'];
                        var password=request.cookies['password'];
                        const queryString = 'SELECT * from users WHERE name=($1)';
                        const inputString=[username];
                        let userId="";
                            pool.query(queryString, inputString, (err, result) =>
                            {

                                if (err)
                                    {
                                        console.error('query error:', err.stack);
                                        response.send( 'query error' );
                                    }
                                else
                                    {
                                            data.userId=result.rows[0].id;

                                            //response.send(data);


                                    const querySongString = 'SELECT * from songs WHERE id = ($1)';
                                    const input = [request.params.id]
                                    pool.query(querySongString, input, (Songerr, Songresult) =>
                                        {

                                            if (err)
                                                {
                                                    console.error('query error:', Songerr.stack);
                                                    response.send( 'query error' );
                                                }
                                            else
                                                {


                                                    data.song=Songresult.rows;
                                                    response.render("song",data);
                                                    //response.send( data );

                                                }
                                        });

                                     }
                             });
    });

// add solo song
app.post('/addSoloSong',(request,response)=>{
    //response.send(request.body);

       const whenQueryDone = (queryError, result) => {
            if( queryError ){
              console.log("EERRRRRRRROR");
              console.log(queryError);
              response.status(500);
              response.send('db error');
            }else{
              // if the query ran wiothout errors


              response.redirect("/favorites");
            }
          };
            const user_id = parseInt(request.body.user_id);
            const song_id = parseInt(request.body.song_id);
            const input = [user_id, song_id];
            let queryString = "INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)";


            pool.query(queryString, input, whenQueryDone);

})


///form to edit
app.get('/songs/:id/edit',(request,response)=>{
    //console.log("enter edit")
    const data={}
    //response.send("Edit mode");
    const queryString = 'SELECT * from songs WHERE id = ($1)';
    const input = [request.params.id]
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {


                        data.song=result.rows;
                        response.render("editSong",data);
                        //response.send( data );
                    }
            });

})

//// process of edit

app.put('/songs/:id', (request,response)=>{


     const data={};
     console.log(request.body);
     const queryString= "UPDATE songs SET title= ($2) , album= ($3), preview_link= ($4), artwork = ($5) WHERE id = ($1)";
     const id=request.params.id;
    const input = [request.params.id, request.body.title, request.body.album, request.body.img, request.body.preview_link];
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {




                        //response.render("editArtist",data);
                        let url= "/songs/"+id;
                        response.redirect(url);
                        //response.send( data );
                    }
            });
})


///delete artist
//Accepts a request to delete
app.delete('/songs/:id', (request,response)=>{

     const queryString= "DELETE FROM songs WHERE id = ($1)";
     const id=request.params.id;
        const input = [request.params.id];
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {
                        response.redirect('/songs')
                    }
            });
    })


//////For artist songs

app.get('/artists/:id/songs', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon

        const data={}
        const queryString = 'SELECT title,album, artwork from songs WHERE artist_id = ($1)';
        const input = [request.params.id]
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {


                        data.songs=result.rows;
                        const queryArtistString = 'SELECT * from artists WHERE id = ($1)';
                        pool.query(queryArtistString, input, (err, result) =>
                        {

                            if (err)
                                {
                                    console.error('query error:', err.stack);
                                    response.send( 'query error' );
                                }
                            else
                                {


                                data.artist=result.rows;
                                response.render("artistSong",data);
                                //response.send( data );
                                }
            });
                    }
            });
    });

//////This goes to the form

app.get('/artists/:id/songs/new', (request, response) => {
  // respond with HTML page with form to create new songs
  //response.render('newArtistSong');
            const input = [request.params.id]
            const data={};
            const queryArtistString = 'SELECT * from artists WHERE id = ($1)';
                pool.query(queryArtistString, input, (err, result) =>
                {

                    if (err)
                        {
                            console.error('query error:', err.stack);
                            response.send( 'query error' );
                        }
                    else
                        {


                        data.artist=result.rows;
                        response.render("newartistSong",data);
                        //response.send( data );
                        }
            });
});

app.post('/artists/:id/songs', (request, response) => {
  // respond with HTML page with form to create new songs
  //response.render('newArtistSong');
  //response.send("edit artist");
  const id =request.params.id;
    const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log("EERRRRRRRROR");
      console.log(queryError);
      response.status(500);
      response.send('db error');
    }else{
      // if the query ran wiothout errors
      console.log(result.rows[0]);
      // response.send('HEY NEW DOOOGGGG::: '+ result.rows[0].id);

      let new_id = result.rows[0].id;

      let url= "/songs/"+new_id;
      response.redirect(url);
    }
  };

    const queryString = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";

    const input=[request.body.title, request.body.album, request.body.preview_link, request.body.img,  parseInt(id)];
    console.log(input);


    pool.query(queryString, input, whenQueryDone);
});


////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////
////22222222222222222222222222222222222222222222222222222222222222////

////Show all Artists
app.get('/playlist',(request,response)=>{
    const queryString = 'SELECT * from playlist';

pool.query(queryString, (err, result) => {

  if (err) {
    console.error('query error:', err.stack);
    response.send( 'query error' );
  } else {
    //console.log('query result:', result);
    const data={};

    data.playlist=result.rows;
    // redirect to home page

    response.render("playlisthome",data);
    //response.send( data );
  }
});
    //response.render('home');
});



app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('newPlaylist');
});

app.post('/playlist',(request,response)=>
    {
        const whenQueryDone = (queryError, result) =>
            {
                if( queryError )
                {
                    console.log("EERRRRRRRROR");
                    console.log(queryError);
                    response.status(500);
                    response.send('db error');
                }
                else
                {

                    console.log(result.rows[0]);

                    let new_id = result.rows[0].id;
                    let url= "/playlist/"+new_id;
                    response.redirect(url);
                }
            };
        const queryString = "INSERT INTO playlist (name) VALUES ($1) RETURNING id";

        const input=[request.body.name];

        pool.query(queryString, input, whenQueryDone);

    });

app.get('/playlist/:id', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon
        console.log(typeof request.params.id);
        const queryString = 'SELECT * from playlist WHERE id = ($1)';
        const input = [request.params.id]
        const data = {};
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {

                        data.playlist=result.rows;
                        //response.render("playlist",data);
                        //response.send( data );
                                const queryJoinString = 'SELECT * FROM songs INNER JOIN playlist_song ON ( songs.id = playlist_song.song_id ) WHERE playlist_song.playlist_id=($1)';

                                const id = [parseInt (request.params.id)]
                                console.log(id);
                                pool.query(queryJoinString, id, (Songerr, Songresult) =>
                                {

                                    if (err)
                                        {
                                            console.error('query error:', Songerr.stack);
                                            response.send( 'query error' );
                                        }
                                    else
                                        {
                                            console.log("Query Successful");

                                            data.songs=Songresult.rows;
                                            console.log(data);
                                            response.render("playlist",data);
                                            //response.send( data );
                                        }
                                });
                        }
                });
        });

///form to edit
app.get('/playlist/:id/edit',(request,response)=>{
    //console.log("enter edit")
    const data={}
    //response.send("Edit mode");
    //const queryString = 'SELECT * from songs WHERE id = ($1)';
    const queryString = 'SELECT songs.id  FROM songs INNER JOIN playlist_song ON ( songs.id = playlist_song.song_id ) WHERE playlist_song.playlist_id=($1)';
    const input = [request.params.id];
    const id = parseInt(request.params.id);
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {
                        let querySongString = 'SELECT * from songs WHERE ';

                        const input = []
                        for(let currentSongCount = 0; currentSongCount < result.rows.length; currentSongCount++)
                        {
                            querySongString += `id !=($${currentSongCount+1}) and `;
                            input.push(parseInt(result.rows[currentSongCount].id));
                        }
                        querySongString = querySongString.slice(0, -4);
                        console.log(querySongString);
                        console.log(input);
                        //response.send(result.rows);
                            pool.query(querySongString, input, (Songerr, Songresult) =>
                                {

                                    if (Songerr)
                                        {
                                            console.error('query error:', Songerr.stack);
                                            response.send( 'query error' );
                                        }
                                    else
                                        {

                                            const queryNameString = 'SELECT * from playlist WHERE id = ($1)';
                                            const input = [id]
                                            data.song=Songresult.rows;
                                            //response.send(result.rows);
                                                pool.query(queryNameString, input, (Nameerr, Nameresult) =>
                                                    {

                                                        if (Nameerr)
                                                            {
                                                                console.error('query error:', Nameerr.stack);
                                                                response.send( 'query error' );
                                                            }
                                                        else
                                                            {


                                                                data.name=Nameresult.rows;
                                                                response.render("editSongsToPlayList",data);
                                                                //response.send( data );
                                                            }
                                                    });
                                        }
                                });
                    }
            });

})

//// process of edit

app.put('/playlist/:id', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon
        console.log(typeof request.params.id);
        //response.send(request.body);
        console.log(request.body)

          const id =parseInt(request.params.id);
            const whenQueryDone = (queryError, result) => {
            if( queryError ){
              console.log("EERRRRRRRROR");
              console.log(queryError);
              response.status(500);
              response.send('db error');
            }else{
              // if the query ran wiothout errors


              let url= "/playlist/"+id;
              response.redirect(url);
            }
          };
            const input = [id];
            let queryString = "INSERT INTO playlist_song (playlist_id, song_id) VALUES ";
            for (let songCount =0; songCount < request.body.songid.length; songCount++)
            {
                //console.log(request.body.songid[songCount]);

                queryString += `($1, $${songCount+2}),`;
                input.push(parseInt(request.body.songid[songCount]));
            }
            queryString=queryString.slice(0,-1);
            console.log(queryString)
            console.log(input);


            pool.query(queryString, input, whenQueryDone);
    });

app.get('/playlist/:id/newsong', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon

        const queryString = 'SELECT * from playlist WHERE id = ($1)';
        const input = [request.params.id]
        const data={};
        data.id= request.params.id;
        pool.query(queryString, input, (err, result) =>
            {

                if (err)
                    {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                    }
                else
                    {


                        data.playlist=result.rows;
                        //response.render("playlist",data);
                        const querySongString = 'SELECT * from songs';
                        pool.query(querySongString, (songErr, songResult) =>
                            {

                                if (err)
                                    {
                                        console.error('query error:', songErr.stack);
                                        response.send( 'query error' );
                                    }
                                else
                                    {
                                        data.song=songResult.rows;
                                        //response.send( data );
                                        response.render("songsToPlayList",data);


                                    }
                            })

                    }
            });
    });


app.post('/playlist/:id', (request, response) =>
    {
        // respond with HTML page with form to create new pokemon
        console.log(typeof request.params.id);
        //response.send(request.body);
        console.log(request.body)

          const id =parseInt(request.params.id);
            const whenQueryDone = (queryError, result) => {
            if( queryError ){
              console.log("EERRRRRRRROR");
              console.log(queryError);
              response.status(500);
              response.send('db error');
            }else{
              // if the query ran wiothout errors


              let url= "/playlist/"+id;
              response.redirect(url);
            }
          };
            const input = [id];
            let queryString = "INSERT INTO playlist_song (playlist_id, song_id) VALUES ";
            for (let songCount =0; songCount < request.body.songid.length; songCount++)
            {
                //console.log(request.body.songid[songCount]);

                queryString += `($1, $${songCount+2}),`;
                input.push(parseInt(request.body.songid[songCount]));
            }
            queryString=queryString.slice(0,-1);
            console.log(queryString)
            console.log(input);


            pool.query(queryString, input, whenQueryDone);
    });
app.get('/favorites',(request, response) =>{
                            var data={};
                        var username = request.cookies['username'];
                        data.userName=username;
                        var password=request.cookies['password'];
                            if( username === undefined ){

                              response.send("Please log in");
                              return;
                                }
                        const queryString = 'SELECT * from users WHERE name=($1)';
                        const inputString=[username];
                        let userId="";
                            pool.query(queryString, inputString, (err, result) =>
                            {

                                if (err)
                                    {
                                        console.error('query error:', err.stack);
                                        response.send( 'query error' );
                                    }
                                else
                                    {
                                            data.userId=result.rows[0].id;


                                            //response.send(data);
                                            const queryJoinString = 'SELECT * FROM songs INNER JOIN favorites ON ( songs.id = favorites.song_id ) WHERE favorites.user_id=($1)';
                                            const inputString=[data.userId];
                                            let userId="";
                                                pool.query(queryJoinString, inputString, (Joinerr, Joinresult) =>
                                                {

                                                    if (err)
                                                        {
                                                            console.error('query error:', Joinerr.stack);
                                                            response.send( 'query error' );
                                                        }
                                                    else
                                                        {
                                                                //data.userId=Joinresult.rows[0].id;
                                                                data.songs= Joinresult.rows;
                                                                //response.send(data);
                                                                response.render('favlist',data);



                                                         }
                                                 });



                                     }
                             });
    });
app.get('/favorites/new',(request,response)=>{
                        var data={};
                        var username = request.cookies['username'];
                        var password=request.cookies['password'];
                        const queryString = 'SELECT * from users WHERE name=($1)';
                        const inputString=[username];
                        let userId="";
                            pool.query(queryString, inputString, (err, result) =>
                            {

                                if (err)
                                    {
                                        console.error('query error:', err.stack);
                                        response.send( 'query error' );
                                    }
                                else
                                    {
                                            data.userId=result.rows[0].id;

                                            //response.send(data);


                                            const querySongString = 'SELECT * from songs';

                                            pool.query(querySongString, (Songerr, Songresult) => {

                                              if (Songerr) {
                                                console.error('query error:', Songerr.stack);
                                                response.send( 'query error' );
                                              } else {
                                                //console.log('query result:', result);


                                                data.song=Songresult.rows;
                                                // redirect to home page

                                                response.render("songsToFavorite",data);
                                                //response.send( data );
                                              }
                                            });

                                     }
                             });
});


app.post('/favorites',(request, response) =>{

    //response.send(request.body);



    const whenQueryDone = (queryError, result) => {
            if( queryError ){
              console.log("EERRRRRRRROR");
              console.log(queryError);
              response.status(500);
              response.send('db error');
            }else{
              // if the query ran wiothout errors


              response.redirect("/favorites");
            }
          };
            const id = parseInt(request.body.user_id);
            const input = [id];
            let queryString = "INSERT INTO favorites (user_id, song_id) VALUES ";
            for (let songCount =0; songCount < request.body.songid.length; songCount++)
            {
                //console.log(request.body.songid[songCount]);

                queryString += `($1, $${songCount+2}),`;
                input.push(parseInt(request.body.songid[songCount]));
            }
            queryString=queryString.slice(0,-1);
            console.log(queryString)
            console.log(input);

            pool.query(queryString, input, whenQueryDone);
})


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