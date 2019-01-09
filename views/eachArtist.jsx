var React = require("react");

class EachArtist extends React.Component {
  render() {
    let id= this.props.artist[0].id;
    let imgLink = this.props.artist[0].photo_url;
    let name = this.props.artist[0].name;
    let nationality = this.props.artist[0].nationality;

    return (
      <html>
        <head />
        <body>
          <img src={imgLink}/>
          <h3>{name}</h3>
          <h5>{nationality}</h5><br/>
          <a href={"/artist/" + id + "/edit"}>Edit {name}'s information</a>
        </body>
      </html>
    );
  }
}

module.exports = EachArtist;
