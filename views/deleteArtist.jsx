var React = require("react");

class deleteArtist extends React.Component {
  render() {
    const list = this.props.artist.map((card) => {
      return (
        <div>
        <img width="400px" height="400px" src={card.photo_url} alt={card.name}/>

                <p><strong>Artist ID :</strong> {card.id}</p>
                <p><strong>Artist Name:</strong> {card.name}</p>
                <p><strong>Artist Nationality:</strong> {card.nationality}</p>
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