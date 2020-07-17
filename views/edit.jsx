var React = require("react");

class Edit extends React.Component {
  render() {

    var artist = this.props.artist;
    var url = `/artist/${this.props.artist.id}?_method=PUT`;
    console.log(url);
    return (
      <html>
        <head />
        <body>
          <h1>Editing Artist Data</h1>
          <form method = "POST" action = {url}>

            <h3>Artist's Current Name</h3>
            <input name = "name" value = {artist.name}/>

            <h3>Artist's Current Photo URL</h3>
            <input name = "photo_url" value = {artist.photo_url}/>

            <h3>Artist's Current Nationality</h3>
            <input name = "nationality" value = {artist.nationality}/>

            <br></br>
            <input type = "submit"/>

          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;