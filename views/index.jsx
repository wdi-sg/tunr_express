var React = require("react");

class Index extends React.Component {
  render() {

  	const artistsElements = this.props.artists.map((artist)=>{
      console.log("artist pic",artist.photo_url);
  		return (
        <div>
          <li>{artist.id} : {artist.name}</li>
          <img src={artist.photo_url} alt="" height="200"/>
          <li>{artist.nationality}</li>
        </div>
  			);
  	});

    return (
      <html>
        <head />
        <body>
          <h1>All Artists</h1>
          <ul>{artistsElements}</ul>
        </body>
      </html>
    );
  }
}

module.exports = Index;
