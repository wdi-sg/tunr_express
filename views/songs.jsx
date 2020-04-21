var React = require("react");
class Songs extends React.Component {

  render() {
    const songTitles = this.props.song.map((song)=>{
        return <li>{song.title}</li>
    });
    return (
      <html>
        <head />
        <body>
            <p>Artist Name : {this.props.artist}</p>
            <p>{songTitles}</p>
        </body>
      </html>
    );
  }
}

module.exports = Songs;
