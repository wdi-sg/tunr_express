var React = require("react");

class Songs extends React.Component {
  render() {
            var urlNew = '/homepage/'+this.props.artist.id+'/songs/new';
            var url = '/homepage/';
            var mapSongsData = this.props.songsDetail.map(songs=>{
            return(
                <div className="individualStyle">
                    <p className="player">{songs.title}
                        <br />
                        <audio controls>
                            <source src={songs.preview_link} type="audio/mp3"/>
                        </audio>
                    </p>
                    <br />
                </div>
            );
        });

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/style5.css"/>
        </head>
        <body>
        <div className="containertop row">
            <div className="col-4">
                <a className="button" href={url}>!ARTISTS!!</a>
            </div>
            <div className="col-4">
                <div className="artist">
                    <iframe src="https://giphy.com/embed/QrooGoDTEGK52" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
            </div>
            <div className="col-4">
                <a className="button" href={urlNew}>!!Add New Song!!</a>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="position-fixed justify-content-center">
                        <h1>{this.props.artist.name}</h1>
                        <img className="artistImage" src={this.props.artist.photo_url}/>
                    </div>
                </div>
                <div className="col-6">
                    <h1>Song Track Prev</h1>
                    <p>{mapSongsData}</p>
                </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Songs;