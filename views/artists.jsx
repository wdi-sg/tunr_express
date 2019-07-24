var React = require("react");
const Template = require('./template.jsx');
var ArtistProfile  = require('./components/artistProfile.jsx');

class Artists extends React.Component {
  render() {

    const artistsList = this.props.artists.map((artist)=>{
        return <ArtistProfile data={artist}/>
    });

    return (
      <Template>
          <div>
          <a href="/artists/new">Add New Artist</a>
          </div>
          <h1>This is Artists Page</h1>
          <div>{artistsList}</div>
      </Template>
    );
  }
}

module.exports = Artists;
