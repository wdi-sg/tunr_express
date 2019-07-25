var React = require("react");
var Layout = require("./layout");
var SongsList = require("./songs-list");

class SongsIndex extends React.Component {
  render() {

    let songsList = this.props.songsData;
    return (
        <Layout>
          <h1>Welcome!</h1>
          <SongsList songsList={songsList}></SongsList>
       </Layout>
    );
  }
}

module.exports = SongsIndex;