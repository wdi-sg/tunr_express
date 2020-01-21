var React = require("react");

//{this.props.song[0]}

class Song extends React.Component {
  render() {

    let list = this.props.songs.map(el => {
      return <li class="list-group-item">{el.title} {el.album}</li>
    })
    
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        </head>
        <body>
          <
          <ul className="list-group">
            {list}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Song;