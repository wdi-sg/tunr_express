console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');

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

// require models from db.js
const allModels = require('./db');

// import routes
const setRoutesFunction = require('./routes');
setRoutesFunction(app, allModels);


const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
  
  console.log("closing");
  
  server.close(() => {
    
    console.log('Process terminated');
    
    allModels.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
