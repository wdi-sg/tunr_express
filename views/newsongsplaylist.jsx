var React = require('react');

var Layout = require('./layout')

class NewSongsPlaylist extends React.Component {
  render() {
    let id = "/playlists/"+this.props.id+"?_method=delete";
    let editLink = "/playlists/"+this.props.id+"/edit";
    let songLink = "/playlists/"+this.props.id+"/songs";
    let title = "Add Song to " + this.props.playlist.name;
    let actionLink = "/playlists/" + this.props.id;

    let songLists = this.props.songs.map((song)=>{
        let songTitle = song.title;
        let songId = song.id;

        return (
            <option value={songId}>
            {songTitle}
            </option>
            )
        });

    return (
    <Layout>
            <div className="container">
            <h1>{title}</h1>
            <img src="https://upload.wikimedia.org/wikipedia/en/2/23/PENTAGON_Demo_01.jpg" className="img-fluid" alt="photo"/>
            <div className="row">

                    <form method="POST" action={actionLink}>

                    <div className="mb-5">
                    <h3>Choose You Song Title!</h3>
                    </div>

                    <select name = "song_id" className="mb-5">
                    {songLists}
                    </select>

                    <div>
                    <button type="submit" className="btn btn-danger btn-customized">Create</button>

                    <a href="/playlists/" className="btn btn-primary ml-4">Back</a>
                    </div>
                    </form>
            </div>
          </div>
      </Layout>
    );
  }
}

module.exports = NewSongsPlaylist;