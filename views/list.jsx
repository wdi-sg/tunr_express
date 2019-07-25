var React = require('react');

class List extends React.Component {
  render() {

    let artistsList = this.props.artistsList.map(artist => {

        return(
            <div className="artist-item">
                <p>{artist.name}</p>
                <img className="artist-img" src={artist.photo_url}/>
                <p>{artist.nationality}</p>
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