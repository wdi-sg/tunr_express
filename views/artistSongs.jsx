var React = require("react");
var Layout = require('./layout');

class ArtistSongs extends React.Component {
  render() {

    const artistSongs = this.props.artistSongs;
    // return the artist array of objects

    let allArtistSongs = artistSongs.map(obj => {
        //const link = `artist/${obj.id}`;

        return  <div class="indvSong-container">
                    <div class="albumName-container">
                        <h2>{obj.album}</h2>
                    </div>

                    <div class="title-container">
                        <h3>{obj.title}</h3>
                    </div>

                    <div class="preview-container">
                        <audio controls>
                            <source src={obj.preview} type="audio/m4a" />
                        </audio>
                    </div>
                </div>


    }) // end of map




    return (<Layout>
        <div class="mainSong-container">

                {allArtistSongs}

        </div>

{/*            <div class="card-group">
                {allArtist}
            </div>*/}
    </Layout>);
  }
}

module.exports = ArtistSongs;