var React = require('react');
const Template = require('./template.jsx');
var SongItem  = require('./components/songItem.jsx');

class ArtistSongsPage extends React.Component {
  render() {
    var url = '/artists';
    var editURL = '/artists/' + this.props.artist[0].id + '/edit';
    var deleteURL = '/artists/' + this.props.artist[0].id + '?_method=DELETE' ;


    const songList = this.props.songs.map((song)=>{
        return <SongItem data={song}/>
    });


    return (
      <Template>
        <div>
          <a href={url}> Back to Artists</a>
          <h1>{this.props.artist[0].name}</h1>
          <p>{this.props.artist[0].nationality}</p>
          <img src={this.props.artist[0].photo_url}></img>
          {/*<a href={editURL}> Edit Artist</a>*/}
          <form action={editURL}>
              <input type="submit" value="Edit Artist"/>
          </form>
          <form method="POST" action={deleteURL}>
              <input type="submit" value="Delete Artist"/>
          </form>
        </div>

          <table>
            <tr>
              <th width="20%">Title</th>
              <th width="20%">Album</th>
              <th width="60%">Artwork</th>
            </tr>

              {songList}

          </table>
      </Template>
    );
  }
}

module.exports = ArtistSongsPage;
