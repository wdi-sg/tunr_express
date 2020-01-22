var React = require('react');

class ShowPlaylist extends React.Component {
  render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>

    return (
      <html>
        <head>
            <title>{this.props.selectedArtist.name}</title>
        </head>
        <body>
          <div>
            <h1>This is <span style={{ color: "#4DDDD0", fontWeight: "lighter"}}> {this.props.selectedArtist.name} </span></h1>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ShowPlaylist;