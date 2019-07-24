var React = require('react');
var Layout = require('./components/layout.jsx');

class ArtistSongs extends React.Component {
  render() {
    const songsList = this.props.songs.map(songs =>{
        let songsPage = "/artist/"+songs.artist_id+"/songs/"+songs.id+"/"+songs.preview_link;
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

    return(
        <Layout>
            <h1> All songs of {this.props.artist.name} </h1>
            <div className = "container">
                <div class = "songsContainer">
                {songsList}
                </div>
            </div>
        </Layout>
    )
  }
}


module.exports = ArtistSongs;