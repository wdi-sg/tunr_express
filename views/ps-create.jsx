const React = require('react');

class Create extends React.Component {
  render(){

    return(
      <html>
        <body>
          <h1>Song added to Playlist</h1>
            <p>Song Id: {this.props.rows.id} </p>
            <p>Title: {this.props.rows.title}</p>
            <p>Album: {this.props.rows.album}</p>
            <p>Preview Link: {this.props.rows.preview_link}</p>
            <p>Artwork: {this.props.rows.artwork}</p>
            <p>Artist Id: {this.props.rows.artist_id}</p>
        </body>
      </html>
    )
  }
}

module.exports = Create;