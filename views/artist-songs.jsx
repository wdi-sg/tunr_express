var React = require("react");

class ArtistSongs extends React.Component {
  render() {
      var artists = this.props.artists;
      if(artists.length==0){
        artists = [
          <li key = "Not Found"className = "border-dark border-bottom">
          <h2>Artist not found</h2>
          </li>
        ]
      }
      else if(artists.length==1){
        artists = artists.map((element,index) =>{ 
          return <li key = {element.name} className = "border-dark border-bottom">
          <h2>{element.name}</h2>
          <br/>
          <img src={`${element.photo_url}`} className = "w-25"/>
          <br/>
          <h3> Nationality: {element.nationality}</h3>
          <br/>
          </li>
        })
      }
      else {
      artists = artists.map((element,index) =>{ 
        return <li key = {element.name} className = "border-dark border-bottom">
        <h2> {element.artistid}. {element.name}</h2>
        <br/>
        <img src={`${element.photo_url}`} className = "w-25"/>
        <br/>
        <h3> Nationality: {element.nationality}</h3>
        <br/>
        </li>
      })
    }
    var songs = this.props.songs;
    songs = songs.map((element,index) =>{ 
        return <li key = {element.title} className="list-group-item">
        <h4> {element.songid}. {element.title}</h4>
        <h5>{element.album}</h5>
        <img src={`${element.artwork}`} className = "w-25"/>
        <br/>
        <a href={`${element.preview_link}`} target="_blank">Song Sample</a>
        <br/>
        </li>
      })
    return (
      <html>
          <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>

        </head>
        <body>
          <h1>Artists</h1>
          <ul>
            {artists}
          </ul>
          <ul className="list-group">
            {songs}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
