var React = require("react");

class Songs extends React.Component {
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
            var urlNew = '/homepage/'+this.props.artist.id+'/songs/new';
            var url = '/homepage/';
            var mapSongsData = this.props.songsDetail.map(songs=>{
            return(
                <div style={individualStyle}>
                    <img style={imageStyle} src ={songs.artwork}/>
                    <p>Song title: {songs.title}</p>
                    <audio controls>
                        <source src={songs.preview_link} type="audio/m4a"/>
                    </audio>
                </div>
            );
        });

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
        <div className="containertop row">
            <div className="col-4">
                <a className="button" href={url}>!ARTISTS!!</a>
            </div>
            <div className="col-4">
                <p>{this.props.artist.name}</p>
            </div>
            <div className="col-4">
                <a className="button" href={urlNew}>!!Add New Song!!</a>
            </div>
        </div>
          <div className="container">
              <p>{mapSongsData}</p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Songs;