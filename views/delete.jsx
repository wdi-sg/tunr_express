var React = require("react");

class Delete extends React.Component {
  render() {

    let artist = this.props.artist;
    console.log(this.props.artist.id + "TESTTTTTT");
    let url = `/artists/${artist.id}?_method=DELETE`;
    console.log('url', url)
    console.log(artist);

    return (
      <html>
        <head />
        <body>
          <h1> {artist.name} </h1>
          <img src={artist.photo_url}/>
          <h2> {artist.nationality} </h2>
          <div>
            <form action={url} method ="POST">
                <input type="submit" value="delete this artist"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;