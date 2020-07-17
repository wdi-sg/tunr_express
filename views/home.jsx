var React = require("react");

class Home extends React.Component {
  render() {


    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>
        </head>
        <body>
         <h1 style={{width: '100%', margin: '20% auto', textAlign: 'center', fontFamily: 'Montserrat'}}>Hello World!</h1>
        </body>
      </html>
    );




}


}

module.exports = Home;