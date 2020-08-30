var React = require("react");

class Single_artist extends React.Component {
  render() {
    let artist = this.props[0];
    return (
      <html>
        <head />
        <body>
          <div>
            <div>
              <div>
                <h2>{artist.name}</h2>
                <img src={artist.photo_url} alt="artist" width="250"/>
                <div>Nationality: {artist.nationality}</div>
                <br/>
                <br/>
                <div>
                  <form method="POST" action={`/artists/${artist.id}?_method=DELETE`}>
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

module.exports = Single_artist;
