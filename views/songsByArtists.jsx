var React = require("react");
var DefaultLayout = require('./layouts/default');


class SongsByArtist extends React.Component {

   render() {
    let songCard = this.props.songList.map(song => {
        return (
                    <div className="card col-5 m-4 d-inline-block" styles="width: 18rem;">
                        <img className="card-img-top" src={song.artwork}/>
                      <div className="card-body">
                      <a href={song.preview_link} className="card-title">Title: {song.title}</a>
                        <p className="card-text">Album: {song.album}</p>
                      </div>
                    </div>
            )
    })



    return (

    <DefaultLayout>
        <body>
            <div>
            <h3 className="h4 mr-5 d-inline-block   ">Songs</h3>
            <a href={'/artists/' +this.props.id+ '/songs/new'} className="btn btn-primary text .d-inline-block">Create New</a>
            </div>
            {songCard}
        </body>
    </DefaultLayout>

    )

  }
}

module.exports = SongsByArtist;
