var React = require("react");

class Single extends React.Component {
  render() {
     console.log('get a song');
     console.log(this.props.artistSong);
    return (
      <html>
        <body>
            <form method="GET">
            Artist: {this.props.artistSong.name}<br/>
            <img src={this.props.artistSong.artwork} alt="artwork"/><br/>
            Album: {this.props.artistSong.album}<br/>
            Song: {this.props.artistSong.title}<br/>
            <audio controls>
                <source src={this.props.artistSong.preview_link} type="audio/mpeg"/>
                </audio>
          </form>

        </body>
      </html>
    );
  }
}

module.exports = Single;