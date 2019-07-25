var React = require('react');
var Layout = require('./components/layout.jsx');

class ArtistSongs extends React.Component {
  render() {

    const songs = this.props.songs.map(songs =>{
        return (
            <div className = "songsList">
                <h3>{songs.title}</h3>
                <p>{songs.album}</p>
                <audio controls>
                    <source src={songs.preview_link} type="audio/m4a"/>
                </audio>
            </div>
        )
    });

    let artistPage = "/artist/"+this.props.artist.id;
    let addSong = "/artist/"+this.props.artist.id+"/songs/new";


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