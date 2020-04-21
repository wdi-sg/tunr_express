var React = require("react");

class DisplayArtists extends React.Component {
  render() {

    const displayArtists = this.props.artists.map((artist, index) => {
        const link = '/artists/' + (index + 1);
        return <li><a href={link}>{artist.name}</a></li>
    })

    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>

        <body>
          <h1>Artists: </h1>
          <div>
          <ol>
          {displayArtists}
          </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DisplayArtists;