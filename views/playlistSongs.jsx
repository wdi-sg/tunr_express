var React = require("react");

//Using string and literals in react.
class Asong extends React.Component {
  render (){

    return(
      <div class="card" style={{width: 18 + 'rem'}}>
        <img class="card-img-top" src={this.props.artwork}/>
        <div class="card-body">
          <p class="card-text">{this.props.title} {this.props.album}</p>
        </div>
      </div>
      )

  }

}


class SongsPlaylist extends React.Component {
  render() {
    let playlistName = this.props.info[0].name

    let list = this.props.info.map(song => {
      return <Asong title={song.title} album={song.album} artwork={song.artwork}/>
    })

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        </head>
          <body>
          <h1>{playlistName}</h1>
            <ul>
              {list}
            </ul>
          </body>
      </html>
    );
  }
}

module.exports = SongsPlaylist;