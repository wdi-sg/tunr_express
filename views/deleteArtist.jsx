var React = require("react");

class deleteArtist extends React.Component {
  render() {
    const list = this.props.artist.map(item => {
      return (
        <div>
        <li>{item.id}. {item.name} ({item.nationality})</li>
        <li><img width="400px" src={item.photo_url} alt="photo of artist"/></li> 
        </div>
      );        
    });
    const id = this.props.artist[0].id;

    const deletePath = `/artists/${id}?_method=DELETE`;
    const cancelPath = `/artists/${id}`;

    return (
      <html>
        <head />
        <body>
          <h1>Delete Artist</h1>
          {list}
          <h3>Confirm delete artist?</h3>
          <form method="post" action={deletePath}>
          <input type="submit" value="Delete"/>
          </form>
          <form method="get" action={cancelPath}>
          <input type="submit" value="Cancel"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = deleteArtist;
