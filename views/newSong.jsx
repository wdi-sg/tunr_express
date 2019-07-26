var React = require("react");

class NewSong extends React.Component {
  render() {

    let artistId = this.props.artistId;

    let url = '/artist/' + artistId + '/song';

    return (

      <html>
        <head/>
        <body>
          <h1>New Song !</h1>
          <form method="POST" action={url}>

            <h3>Song's Title</h3>
            <input title = "title"/>

            <h3>Song's Album</h3>
            <input album = "album"/>

            <h3>Song's Preview Link</h3>
            <input preview_link = "preview_link"/>

            <h3>Song's Artwork</h3>
            <input artwork = "artwork"/>

            <h3>Song's Artist Id</h3>
            <input name = "artist_id" value = {artistId}/>

            <br></br>
            <input type = "submit"/>

          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;