var React = require("react");

class Home extends React.Component {
  render() {
    // console.log("INSIDE REACT INDEX", this.props.artists );
    const artistsElements = this.props.artists.map((artist)=>{

    let linkPath = "/artists/" + artist.id;

    return (
      <li key = {artist.id} style={{ listStyleType: "none" }} >
        <a href={linkPath}> {artist.name}</a>
      </li>
    );
  });
    return (
      <html>
        <head />
        <body>
          <div>
            <h1>All Artists</h1>
              <ul>
                {artistsElements}
              </ul>
            </div>
        </body>
      </html>
    );
  }
} 

module.exports = Home;
