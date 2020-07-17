var React = require('react');

class List extends React.Component {
  render() {

    let artistsList = this.props.artistsList.map(artist => {

        return(
            <div className="artist-item col col-lg-3 col-sm-6">
                <div className="row artist-img-wrapper">
                    <img className="artist-img" src={artist.photo_url}/>
                </div>
                <div className="info-wrapper text-center">
                    <p>{artist.name}</p><br />
                    <p>{artist.nationality}</p>
                </div>
            </div>
        )
    })


    return (
      <div>
        {artistsList}
      </div>
    );
  }
}
module.exports = List;
// <img src={artist.photo_url}/>