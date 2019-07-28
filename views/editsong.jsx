var React = require('react');

class Editsong extends React.Component {
  render() {
    console.log('edit song form');
    console.log(this.props);
    var url = "/artist/" +this.props.artistId + "/songs/" +this.props.songId + "/edit?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit song info</h1>
            <form action={url} method="POST">
                 <input type="hidden" name="id" value={this.props.songId}/>
                 <input type="hidden" name="artist_id" value={this.props.artistId}/>
                Artist's name: <input type="text" name="name" value={this.props.songArtist}/><br/>
                Title: <input type="text" name="title" value={this.props.songTitle}/><br/>
                Album: <input type="text" name="album" value={this.props.songAlbum}/><br/>
                Preview link: <input type="text" name="preview_link" value={this.props.songPreview}/><br/>
                Artwork: <input type="text" name="artwork" value={this.props.songArtwork}/><br/>
                <input type="submit" value="Submit"/>
                </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Editsong;