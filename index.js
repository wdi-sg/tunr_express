// init an express app
const express = require('express');
const app = express();

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

// mount ./static onto virt path .pub
app.use('/pub', express.static('./static'));
let options = {
  root: ('static'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

// create postgres-node connection pool
const pg = require('pg');
const configs = {
  user: 'dwu',
  host: '127.0.0.1',
  database: 'DATABASE',
  port: 5432,
};

const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// generic SQL query helper function
const makeQuery = async function (query, values) {
  let results = await pool.query(query, values);
  return results.rows;
};

// routes
app.get('/', (req, res) => {
  res.render('home');
});

// start server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT);
