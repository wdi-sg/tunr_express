// init an express app
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// let forms override methods with "?_method=put"
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// create and use react engine
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

// lets you do form parsing in req.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// database
const db = require('./modules/db');

// mount ./static onto virt path / (for subfolders)
app.use('/', express.static('./static'));
let options = {
  root: ('static'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

// handle visit counter
const visitCounter = require('./modules/visitcounter.js');
app.use(visitCounter);

// check for authentication
const checkAuth = require('./modules/checkauth.js');
app.use(checkAuth);

// route modules
const root = require('./modules/routes.js');
app.use('/', root);

// bounce unauthenticated users out
// res.redirect ('/login');
const gatekeeper = require('./modules/gatekeeper');
app.use(gatekeeper);

const artists = require('./modules/routeartists.js');
app.use('/artists', artists);

const playlists = require('./modules/routeplaylists.js');
app.use('/playlists', playlists);

const songs = require('./modules/routesongs.js');
app.use('/songs', songs);

// start server listen
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log("Listening on port " + PORT));

const onClose = function(){
  console.log("closing");
  server.close(() => {
    console.log('Process terminated');
    db.pool.end( () => console.log('Shut down db connection pool'));
  });
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
