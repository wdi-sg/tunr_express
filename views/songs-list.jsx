var React = require('react');

class SongsList extends React.Component {
  render() {

    let songsList = this.props.songsList.map(song => {

        return(
            <div className="artist-item col col-lg-3 col-sm-6">
                <div className="row artist-img-wrapper">
                    <img className="artist-img" src={song.artwork}/>
                </div>
                <div className="info-wrapper text-center">

                    <p>{song.title}</p><br />
                    <p>{song.album}</p><br />
                </div>
            </div>
        )
    })


    return (
      <div>
        {songsList}
      </div>
    );
  }
}
module.exports = SongsList;
// <p>{song.preview_link}</p><br />