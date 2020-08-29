var React = require("react");

class Single_song extends React.Component {
  render() {
    let song = this.props[0];
    return (
      <html>
        <head />
        <body>
          <div>
            <div>
              <div>
                <h2>{song.title}</h2>
                <img src={song.artwork} alt="song artwork" width="100"/>
                <div>Artist: {song.name}</div>
                <div>Album: {song.album}</div>
                <div><audio controls><source src={song.preview_link} type="audio/mpeg"/></audio></div>
                <br/>
                <br/>
                <div>
                  <form method="POST" action={`/songs/${song.id}?_method=DELETE`}>
                    <input type="submit" value="Delete"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Single_song;
