var React = require("react");

class Songhome extends React.Component {
  render() {

    console.log("THIS PROPS:", this.props);
    let songList = this.props.songs.map(item => {
        return <li class={item.id}>{item.album} {item.artist_id}</li>;
    })

    return (
      <html>
        <head />
        <body>
          <h1>Songs</h1>
          <ul>
          {songList}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Songhome;