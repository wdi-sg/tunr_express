var React = require('react');
class Id extends React.Component {
  render() {
    return (
      <html>
      <head>
        </head>
        <body>
          <div>
            <img src={this.props.artist[0].photo_url}></img>
          </div>
          <div>
            <div>
              <p>Artist name: { this.props.artist[0].name }</p>
              <p>Nationality: { this.props.artist[0].nationality}</p>
              <a href="/artists/edit">Edit Pokemon Details</a>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Id;