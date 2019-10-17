var React = require("react");

class ArtistInfo extends React.Component {
  render() {

    const viewArtistInfo = this.props.artist.map((individualArtist) => (
            <div>
                <p>Name: {individualArtist.name}</p>
                <p>Profile Photo: {individualArtist.photo_url}</p>
                <p>nationality: {individualArtist.nationality}</p>
            </div>
        )
    );

    return (
      <html>
        <head />
        <body>
          <h1>You are viewing details of {this.props.artist[0].name}</h1>
          <div>
              <p>{viewArtistInfo}</p>
              <a href={"/artists/" + this.props.artist[0].id +"/edit"}>Edit Artist Info </a>|
              <a href={"/artists/" + this.props.artist[0].id +"/delete"}> Delete Artist</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistInfo;
