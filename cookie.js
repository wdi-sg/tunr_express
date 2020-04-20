const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.get('/bananas', (request, response) => {
    let bananas = request.cookies['bananas'];
    console.log(request.cookies);
    console.log(request.cookies.bananas);
          if (bananas === undefined) {
            bananas = 1;
      } else {
            bananas = parseInt(bananas)+1;
      }
      response.cookie(`bananas`, bananas);
      response.send(`bananas = ${bananas}`);
})



app.get('/', (request, response) => {
  // send response with some data (a string)
  var visits = request.cookies['visits'];

  // see if there is a cookie
if( visits === undefined ){

  // set a default value if it doesn't exist
  visits = 1;
}else{

  // if a cookie exists, make a value thats 1 bigger
  visits = parseInt( visits ) + 1;
}

// set the cookie
response.cookie('visits', visits);
response.send(`Hellooooo. You have visited this route ${visits} times.`)
});







app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



