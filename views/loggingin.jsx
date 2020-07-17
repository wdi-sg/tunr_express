var React = require("react");

class Loggingin extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque:400,600&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body className="logging-in">
            <img id="logo" src="logo.png"/>
            <br></br>
            <h1>Success!</h1>
            <p>Please hold on while you are redirected.</p>
            <script type="text/javascript" src="/loggingin.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Loggingin;