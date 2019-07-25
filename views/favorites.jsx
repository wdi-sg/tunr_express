var React = require("react");
var Default = require("./layout/default");

class Playlists extends React.Component {
  render() {

    let songs = this.props.songs.map(x=>{
        let url="/artist/"+x.artist_id+"/songs/"+x.id;
        return <li><a href={url}>{x.title}</a></li>
    })

    return (
      <Default title={this.props.title} cookieLogin={this.props.cookieLogin}>
      <h2>Favorites</h2>
        <ul>
            {songs}
        </ul>
        <form action="/favorites/new">
            <input type="submit" value="Add Songs"/>
        </form>
      </Default>
    );
  }
}

module.exports = Playlists;
