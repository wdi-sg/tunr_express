console.log('-- Setting up server --');

const express = require('express');
const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method')); // for delete and put
// app.use(cookieParser());
app.use(express.static('public')); // for access public files
app.use(express.json()); // parse data as json object
app.use(express.urlencoded({
    extended: true
}));

// Set react-views to be default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// import db, models and controllers
const createRoutes = require('./routes/routes');

const allModels = require('./database/db');

// pass in models to controller callback
// for the controller logic to decide
// on which model and view to use

const artistControls = require('./controllers/artist')(allModels);
const songControls = require('./controllers/song')(allModels)

createRoutes(app, artistControls, songControls);



// listen on port 3000 and handle server end
const PORT = 3000;

const server = app.listen(PORT, () => console.log(`-- Server setup complete! Listening on: PORT '+PORT+' --
-- type 'rs' to restart server --
-- try not to break anything now... --`));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    allModels.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);