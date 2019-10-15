var React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body>
          <h1>Artist Succesfully Added</h1>

          <a className="btn btn-primary btn text-light mb-5"
            href="/artists/"
          >
           Home
          </a>
       
        </body>
      </html>
    );
  }
}

module.exports = Home;
