var React = require("react");

class Edit extends React.Component {

  render() {


    var artist = this.props.artist;
    console.log(artist)

    var url = '/single/' + artist.id + '?_method=PUT';

    return (
        <html>
            <body>
                <div>
                  <h1>Edit Artist Data</h1>
                  <form method = "POST" action = {url}>

                    <p>Artist's Current ID</p>
                    <input name="id" value={artist.id}/>

                    <p>Artist's Current Name</p>
                    <input name = "name" value = {artist.name}/>

                    <p>Artist's Current Photo URL</p>
                    <input name = "photo_url" value = {artist.photo_url}/>

                    <p>Artist's Current Nationality</p>
                    <input name = "nationality" value = {artist.nationality}/>

                    <br/>

                    <input type = "submit"/>
                  </form>
                </div>
            </body>
        </html>
    );
  }
}
module.exports = Edit;