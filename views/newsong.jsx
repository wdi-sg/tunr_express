var React = require("react");

class Newsong extends React.Component {
  render() {

    let url = "/playlist/" + this.props.id
    let songArray = this.props.chosenSong;
    let list = songArray.map(song => {
        return (
            <option value={song.id}>{song.title}</option>
            )
    })

    return (
      <html>
        <head>
        <title></title>
               <meta charset="utf-8" />
        </head>

        <body>
          <h1>Add a song to the playlist: </h1>

          <div>
            <form method="POST" action={url}>
            <select name="cars">
            {list}
            </select>
            <input type="submit" value="Add a new song 🎵" />
            </form>
        </div>


        </body>
      </html>
    );
  }
}

module.exports = Newsong;
