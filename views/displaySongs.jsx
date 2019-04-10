var React = require("react");
var Layout = require('./layout');

class DisplaySongs extends React.Component {
  render() {

    const artistSongs = this.props.songs;
    // return the artist array of objects

    let allAlbumSongs = artistSongs.map(obj => {

        return  <div class="indvSong-container">

                    <div class="title-container">
                        <h3>{obj.title}</h3>
                    </div>

{/*                    <div class="preview-container">
                        <audio controls>
                            <source src={obj.preview} type="audio/m4a" />
                        </audio>
                    </div>*/}
                </div>


    }) // end of map




    return (<Layout>
        <div class="mainSong-container">

                {allAlbumSongs}

        </div>

{/*            <div class="card-group">
                {allArtist}
            </div>*/}
    </Layout>);
  }
}

module.exports = DisplaySongs;