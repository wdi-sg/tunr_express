var React = require("react");

class Home extends React.Component {
  render() {
            var imageStyle = {
                height:'200px',
                width:'200px',
                borderRadius:"10%"
            }
            var individualStyle={
                display :"inline-block",
                margin:"10px 50px",
            }
            var urlNew = '/homepage/new';
            var mapArtistData = this.props.result.map(artist=>{
            var url = '/homepage/'+artist.id;
            return(
                <div style={individualStyle}>
                    <a href={url}>
                        <img style={imageStyle} src ={artist.photo_url}/>
                    </a>
                    <p>Artist Name: {artist.name}</p>
                    <p>Artist Nationality: {artist.nationality}</p>
                </div>
            );
        });

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
        <div className="containertop row">
            <div className="artist col-4">
                <h3>!!ARTISTS!!</h3>
            </div>
            <div className="col-4">
                <h1>WELCOME TO TUNR_DB</h1>
            </div>
            <div className="newArtist col-4">
                <a className="button"href={urlNew}><h3>!!Add New Artist!!</h3></a>
            </div>
        </div>
          <div className="container">
              <p>{mapArtistData}</p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;