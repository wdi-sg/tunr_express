var React = require('react');

class displaySongs extends React.Component {
    render() {

    return (
      <html>
        <body>
          <div>
                {this.props.id}
                <br></br>
                {this.props.title}
                <br></br>
                {this.props.album}
                <br></br>
                <audio controls>
                <source src={this.props.preview_link} type="audio/ogg"/>
                </audio>
                <br></br>
                <img src={this.props.artwork}></img>
                <br></br>
                {this.props.artist_id}
          </div>
        </body>
      </html>
        );
    }
}

module.exports = displaySongs;