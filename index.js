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

// enable cookie usage
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// lets you do form parsing in req.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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

// uncategorised routes
app.get('/', (req, res) => {
  let visitCount = req.cookies['visits'];
  console.log(visitCount);
  res.render('home');
});

app.get('/testpage', (req, res) => {
  res.render('template-content');
});

// route modules
const artists = require('./modules/routeartists.js');
app.use('/artists', artists);

const playlists = require('./modules/routeplaylists.js');
app.use('/playlists', playlists);

// start server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));
