var React = require("react");

class Newartist extends React.Component {
  render() {
    // console.log("INSIDE REACT INDEX", this.props.artist);
    return (
      <html>
        <head />
        <body>
          <div>
            <h1>New Artist</h1>
                <h2 key = {this.props.artist.id}>
                  {this.props.artist.name}
                </h2>
                <h3 key = {this.props.artist.id}>
                  {this.props.artist.nationality}
                </h3>
                <img style = {{height: 300}} src = {this.props.artist.photo_url} key = {this.props.artist.id}/><br/>
                <a href = "/artists">Return to Artists</a>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Newartist;
