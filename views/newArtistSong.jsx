var React = require("react");

class NewArtistSong extends React.Component {
  render() {
    let id = this.props.artist[0].id;
    let artist = this.props.artist[0].name;

    return (
      <html>
        <head/>
        <body>
          <h3>Add New Song To {artist}</h3>
          <form action={"/artist/" + id + "/songs"} method="POST">

                <h4>Title</h4>
                <input type="text" name="title" placeholder="e.g. Boom boom bang"/>

                <h4>Album</h4>
                <input type="text" name="album" placeholder="e.g. Bring Her Back"/>
                              
                <h4>Preview Link</h4> 
                <input type="text" name="preview" placeholder="e.g. https://www.youtube.com/i23423fdss"/>

                <h4>Artwork Link</h4> 
                <input type="text" name="artwork" placeholder="e.g. https://www.google.com/img"/>

                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewArtistSong;
