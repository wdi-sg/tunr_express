var React = require("react");

class GetFav extends React.Component {
  render() {
    const songInfoElements = this.props.songInfoArray.map(song => {
        return <li>{song.title} by {song.name}, Album: {song.album}</li>
    })
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <div className="container"><h1>Your Fav Songs</h1></div>
            <ul>{songInfoElements}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = GetFav;