var React = require("react");
var Default = require("./layout/default");

class Playlists extends React.Component {
  render() {

    let songs = this.props.songs.map(x=>{
        let url = '/artist/'+x.artist_id+"/songs/"+x.id;
        return <li><a href={url}>{x.title}</a></li>
    })

    let url = "/playlist/"+this.props.playlistId+"/add";

    return (
      <Default title={this.props.title}>
      <h2>Songs in playlist: {this.props.playlist}</h2>
        <ul>
            {songs}
        </ul>

        <form action={url}>
            <input type="submit" value="Add Songs"/>
        </form>

      </Default>
    );
  }
}

module.exports = Playlists;
