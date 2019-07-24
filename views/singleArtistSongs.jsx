var React = require('react');
var Layout = require('./components/layout.jsx');

class ArtistSongs extends React.Component {
  render() {

    const songs = this.props.songs.map(songs =>{
        let songPage = "/artist/"+songs.artist_id+"/songs/"+songs.id;
        return (
            <div className = "songsList">
                <a href = {songPage}>
                    <h3>{songs.title}</h3>
                </a>
                <p>{songs.album}</p>
                <audio controls>
                    <source src={songs.preview_link} type="audio/m4a"/>
                </audio>
            </div>
        )
    });

    let addSong = "/artist/"+this.props.artist.id+"/songs/new";
    let deleteSong = "/artist/"+this.props.artist.id+"/songs/"+songs.id+"/delete";
    let artistPage = "/artist/"+this.props.artist.id;

    return(
        <Layout>
            <h1> All songs of {this.props.artist.name} </h1>
            <div className = "page-button">
                <form action = {artistPage} method ="GET">
                    <input type = "submit" value=" ← Back"/>
                </form>
                <form action = {addSong} method ="GET">
                    <input type = "submit" value="Add Song" />
                </form>
                <form action = {deleteSong} method ="GET">
                    <input type = "submit" value="Delete Song" />
                </form>
            </div>
            <div className = "container">
                <div class = "songsContainer">
                {songs}
                </div>
            </div>
        </Layout>
    )
  }
}


module.exports = ArtistSongs;