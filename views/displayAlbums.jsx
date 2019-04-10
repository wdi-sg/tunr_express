var React = require("react");
var Layout = require('./layout');

class DisplayAlbum extends React.Component {
  render() {

    const albums = this.props.albums;
    // return the artist array of objects

    let allAlbums = albums.map(obj => {
        const songsLink = `../${obj.album}`;
        //console.log("this is " + obj.album)

        return  <div class="indvAlbum-container">
                    <div class="albumImg-container">
                        <img src={obj.artwork} />
                    </div>

                    <div class="albumName-container">
                        <a href={songsLink}>{obj.album}</a>
                    </div>
{/*
                    <div class="title-container">
                        <h4>{obj.title}</h4>
                    </div>*/}

{/*                    <div class="preview-container">
                        <audio controls>
                            <source src={obj.preview} type="audio/m4a" />
                        </audio>
                    </div>*/}
                </div>


    }) // end of map




    return (<Layout>
        <div class="mainAlbum-container">

                {allAlbums}

        </div>

{/*            <div class="card-group">
                {allArtist}
            </div>*/}
    </Layout>);
  }
}

module.exports = DisplayAlbum;