var React = require('react');

class allartists extends React.Component {
  render() {

    const artists = this.props.artists.map( (artists) => {

        var editLink = "/artists/" + artists.id + "/edit";

        // let linkPath = "/dog/new?owner_id="+owner.id;

        return (<li>
                {artists.id}. {artists.name}, born in {artists.nationality}
                <a href={editLink}>   Edit Details</a>
            </li>);

    });

    return (
      <div>
        <h1>All Artists</h1>
        <ul>
            {artists}
        </ul>
      </div>
    );
  }
}

module.exports = allartists;