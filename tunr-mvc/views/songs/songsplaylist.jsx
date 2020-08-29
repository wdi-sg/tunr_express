var React = require("react");

export default class Songsplaylist extends React.Component {
  render() {
        let {playlists} = this.props;
        let{songId} = this.props;
        let songList = playlists.map(item=>{
            return <li>Playlist {item.name}: <input type={`checkbox`} id={item.id }name={item.id} value={item.id} /></li>

        })
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr Express!</h1>
          <h3>Playlists available to be added:</h3>
          <form method="POST" action={`/songs/songaddedtoplaylist`} >
                <ol>{songList}</ol>
                Song ID to be added: <input type="text" name="songId" defaultValue={songId} readonly="readonly" /> <br /> <br />
    <input type="submit" value="Add" />
</form>
        </body>
      </html>
    )
  }
}
