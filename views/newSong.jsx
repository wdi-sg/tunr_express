var React = require("react");

class NewSong extends React.Component {
  render() {
    const object = this.props.artist[0];
    const artistName = object.name;
    const artistPhoto = object.photo_url;
    const id = this.props.artist[0].id;
    const postPath = `/artists/${id}/songs`;
    return (
      <html>
        <body>
        <h1>Add New Song for {artistName}</h1>
        <img width="500px" src={object.photo_url} alt="Photo of Artist" />
          <h3>
          <form method="post" action={postPath} >
            <p>Song Title: </p><input type="text" name="title" />
            <p>Album: </p><input type="text" name="album" />
            <p>Preview Link: </p><input type="text" name="previewLink" />
            <p>Artwork: </p><input type="text" name="artwork" />
            <br/><input type="submit" value="Submit" />
          </form>
          </h3>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;
