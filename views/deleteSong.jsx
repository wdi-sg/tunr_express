var React = require("react");

class deleteSong extends React.Component {
  render() {
    const list = this.props.song.map((card) => {
      return (
            <div>
                <img width="400px" height="400px" src={card.artwork} alt={card.title}/>
                <p><strong>Song ID :</strong> {card.id}</p>
                <p><strong>Song Name:</strong> {card.title}</p>
                <p><strong>Album Name:</strong> {card.album}</p>
                <p><strong>Listen: </strong><a href={card.preview_link}>{card.title}</a></p>
                <p><strong>Artist ID:</strong> {card.artist_id}</p>
            </div>
      );
    });
    const id = this.props.song[0].id;

    const deletePath = `/songs/${id}?_method=DELETE`;
    const cancelPath = `/songs/${id}`;

    return (
      <html>
        <head />
        <body>
          <h1>Delete Song</h1>
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

module.exports = deleteSong;