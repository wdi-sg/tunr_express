var React = require("react");

class Single extends React.Component {
  render() {
     console.log('get a song');
     console.log(this.props.artistSong);

    // var url1 = "/artist/"+this.props.artistSong.artist_id+ "/songs/" +this.props.artistSong.id;
    var url2 = "/artist/"+this.props.artistSong[0].artist_id+ "/songs/" +this.props.artistSong[0].id + "/edit?_method=PUT";
    var url3 = "/artist/"+this.props.artistSong[0].artist_id+ "/songs/" +this.props.artistSong[0].id + "/delete?_method=delete";

    return (
      <html>
        <body>
            <form method="GET">
            Artist: {this.props.artistSong[0].name}<br/>
            <img src={this.props.artistSong[0].artwork} alt="artwork" height="200" width="230"/><br/>
            Album: {this.props.artistSong[0].album}<br/>
            Song: {this.props.artistSong[0].title}<br/>
            <audio controls>
                <source src={this.props.artistSong[0].preview_link} type="audio/mpeg"/>
                </audio>
          </form>
            <form action={url2}>
            <input type="submit" value="Edit song info"/>
          </form>
           <form action={url3} method="POST">
            <input type="submit" value="Delete song"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Single;