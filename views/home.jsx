var React = require("react");

class Home extends React.Component {
  render() {
            var imageStyle = {
                height:'200px',
                width:'300px'
            }
            var mapArtistData = this.props.result.map(artist=>{
            var url = '/homepage/'+artist.id;
            return(
                <div>
                    <img style={imageStyle} src ={artist.photo_url}/>
                    <p>Artist Id: {artist.id}</p>
                    <a href={url}>
                    <p>Artist Name: {artist.name}</p>
                    </a>
                    <p>Artist Nationality: {artist.nationality}</p>
                </div>
            );
        });

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <p>{mapArtistData}</p>
        </body>
      </html>
    );
  }
}

module.exports = Home;