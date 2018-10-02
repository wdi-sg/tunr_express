const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const PORT = process.env.PORT || 80;

// Initialise postgres client
const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.get('/artists', async (req, res) => {
  await pool.query('SELECT * FROM artists', (queryError, response) => {
    res.render('artists', { artists: response.rows });
  });
});

app.get('/', (req, res) => {
  res.send('YOU TRIGGERED THE HOMEPAGE');
});

app.listen(PORT);
