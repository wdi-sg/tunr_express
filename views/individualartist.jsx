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
            <img src={this.props.result.photo_url} alt="" height="300" width="300" />
          <h1>{this.props.result.name}</h1>

          <a className="btn btn-primary btn text-light mb-5"
            href="artists/songs"
          >
            Songs
          </a>
          
        </body>
      </html>
    );
  }
}

module.exports = Home;
