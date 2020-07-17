var React = require("react");

class Home extends React.Component {
  render() {

    const showArtist = this.props.artists.map(artist => {

    return (

      <html>
        <head />
        <body>

        <div className="showArtist">
              <a href={`/artists/${artists.id}`}>
              <img src={artists.photo_url}/>
              </a>
              <p>{artists.nationality}</p>
              <h2>{artists.name}</h2>
        </div>

        </body>
      </html>
    );
  });


   }
}

module.exports = Home;