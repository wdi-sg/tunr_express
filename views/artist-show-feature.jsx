var React = require("react");
var Layout = require("./component/layout-allpage.jsx");
var Artistsongs = require("./component/component-artist-songs.jsx");

class Home extends React.Component {
  render() {
    //code goes here
    var playlistSelect = this.props.playlist.map((obj)=>{
      return <option value={obj.id}>{obj.playlist_name}</option>
    })
    var checkBoxSelect = this.props.playlist.map((obj)=>{
      return <div><input type="checkbox" value={obj.id} name="playlistarray"/><label>{obj.playlist_name}</label></div>
    })

    var playlistLink = "/playlist/add"
    var artistSongs = this.props.artists.map((obj)=>{
      return <div>
      <img src={obj.artwork}/>
      <p>{obj.artist_id}</p>
      <p>{obj.title}</p>
      <p>{obj.album}</p>
      <audio src={obj.preview_link} controls></audio>
      <p>Add to playlist</p>
      <form action={playlistLink} method="post">
      <select name="playlist">
      <option></option>
      {playlistSelect}
      </select>
      <input type="hidden" name="title" value={obj.title}/>
      <input type="hidden" name="album" value={obj.album}/>
      <input type="hidden" name="preview_link" value={obj.preview_link}/>
      <input type="submit" value="add to playlist"/>
      </form>
      <p>Mass add to playlist</p>
      <form action="/playlist/massadd" method="post">
      {checkBoxSelect}
      <input type="hidden" name="title" value={obj.title}/>
      <input type="hidden" name="album" value={obj.album}/>
      <input type="hidden" name="preview_link" value={obj.preview_link}/>
      <input type="submit" value="mass add to playlist"/>
      </form>
      </div>
    });
    var artistLink = "/artist/"+this.props.artistid+"/edit"
    var editForm=
    <form action={artistLink} method="get">
    <input type="submit" value="Edit artist"/>
    </form>
    var artistDeleteLink = "/artist/"+this.props.artistid+"?_method=DELETE"
    var deleteArtist=
    <form action={artistDeleteLink} method="post">
    <input type="submit" value="Delete artist"/>
    </form>
    var artistNewSongLink = "/artist/"+this.props.artistid+"&"+this.props.artistinfo+"/songs/new"
    var newSong=
    <form action={artistNewSongLink} method="get">
    <input type="submit" value="New Song"/>
    </form>
    //user will put content in here. content will differ from page to page
    return (
      <Layout>
        <div id="artist-holding-page">
          {this.props.artistinfo}
          {editForm}
          {deleteArtist}
          {newSong}
          {artistSongs}
        </div>
      </Layout>
    );
  }
}

module.exports = Home;
// <input type="hidden" value={this.props.artistinfo}/>
