var React = require("react");

class Home extends React.Component {
  render() {

    const artistInfo = this.props.artists.map((individualArtist) => (
            <div>
                <li><a href={"../artists/" + individualArtist.id}>{individualArtist.name}</a></li>
                <p>{individualArtist.photo_url}</p>
                <p>{individualArtist.nationality}</p>
            </div>
        )
    );

    return (
      <html>
        <head />
        <body>
          <h1>Artists</h1>
          <ul>
              {artistInfo}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
