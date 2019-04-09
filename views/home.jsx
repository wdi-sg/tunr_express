var React = require("react");

class Home extends React.Component {
  render() {
    // Javascript here
    // style's value is a str
    const imgWidth = { width: '100%' };
    const artists = this.props.artists.map(artist => {
        console.log(artist["photo_url"]);
        return <div>
                <img style = {imgWidth} src = {artist["photo_url"]}/>
                <p>{artist.name}</p>
                <p>{artist.nationality}</p>
               </div>
    })
    return (
      <div>
        {artists}
      </div>
    );
  }
}

module.exports = Home;