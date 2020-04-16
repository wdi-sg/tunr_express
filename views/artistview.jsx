const React = require('react');

class filename extends React.Component {
  render() {
    console.log(this.props.artist);
    return (
      <html>
        <head>
          <link rel="stylesheet"
                href="/pub/css/bootstrap.min.css"
          />
        </head>

        <body>
          <div className="container text-center">
            <h4>{this.props.artist.name}</h4>
            <img src={this.props.artist.photo_url} />
            <p>From: {this.props.artist.nationality}</p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = filename;
