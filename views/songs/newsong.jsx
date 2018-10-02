var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;

    let actionString = `/artists/${artist.id}/songs/new`;

    return (
    <Layout title="New Song">
      <h1>New Song</h1>
      <form method="POST" action={actionString}>
        <label>Artist:</label>
        <input readOnly disabled value={artist.name}/>
        <input type="hidden" name="artist_id" value={artist.id}/>
        <label>Title:</label>
        <input name="title" required autoComplete="off"/>
        <label>Album:</label>
        <input name="album" required autoComplete="off"/>
        <label>Preview URL:</label>
        <input name="preview_link" required autoComplete="off"/>
        <label>Artwork:</label>
        <input name="artwork" required autoComplete="off"/>
        <input type="submit" value="Submit"/><br/>
      </form>
    </Layout>
    )
  }
}

module.exports = Home;
