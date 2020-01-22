var React = require("react");

//Using string and literals in react.
class ChooseSong extends React.Component {
  render (){

    let songOptions = this.props.songOptions.map(song =>{
      if(song.title == this.props.title){
        return <option selected>{song.title} </option>
      } else {
        return <option>{song.title}</option>
      }
    })

    return(
      <select name="ingreArray" className="form-control">
        {songOptions}
      </select>
      )

  }

}


class EditPlaylist extends React.Component {
  render() {
    let playlistName = this.props.info[0].name

    let list = this.props.info.map(song => {
      return <ChooseSong title={song.title} album={song.album} artwork={song.artwork} songOptions={this.props.allSongs}/>
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

module.exports = EditPlaylist;