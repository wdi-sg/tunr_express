var React = require("react");
var Default = require("./layout/default");

class Singlesong extends React.Component {
  render() {
    let item = this.props.song;
    let editUrl = "/artist/"+item.id+"/edit";
    let deleteUrl = "/artist/"+item.id+"?_method=delete";
    let songList = "/artist/"+item.id+"/songs";
    let playList = this.props.playlists.map(x=>{
        return <option value={x.id}>{x.name}</option>
    })


    return (
      <Default title={this.props.title}>
        <div className="solo-artist">
            <img className="artist-pic" src={item.photo_url}/>
            <table className="table table-bordered">
                <tr>
                    <th scope="row">Title</th>
                    <td>{item.title}</td>
                </tr>
                <tr>
                    <th scope="row">Album</th>
                    <td>{item.album}</td>
                </tr>
                <tr>
                    <th scope="row">Preview Link</th>
                    <td><audio controls preload="none" >
                         <source src={item.preview_link} type="audio/mp4" />
                         </audio></td>
                </tr>
            </table>
            <div className="choices">
                <form action={songList}>
                    <input type="submit" value="Songs"/>
                </form>
                <form action={editUrl}>
                    <input type="submit" value="Edit"/>
                </form>
                <form method="POST" action={deleteUrl}>
                    <input type="submit" value="Delete"/>
                </form>
            </div>
            <div>
                <form className="add-to-playlist" method="POST" action="/playlist/addSongToPlaylist">
                    <select name="playlistId">
                    {playList}
                    </select>
                    <input name="song" value={item.id}hidden/>
                    <input type="submit" value="Add into Playlist"/>
                </form>
            </div>


        </div>
      </Default>
    );
  }
}

module.exports = Singlesong;
