var React = require('react');

class List extends React.Component {
  render() {

    let artistsList = this.props.artistsList.map(artist => {

        return(
            <ul>
                <li>{artist.name}</li>
            </ul>
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