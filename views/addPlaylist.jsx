var React = require('react');
var DefaultLayout = require('./layouts/default');

class Songs extends React.Component {
  render() {
    let songElements = this.props.songs.map((o) => {
        return <li><label><input type="checkbox" name="songs" value={ o.id }/> { o.title }, { o.album }</label></li>
    });

    return (
        <ul>
            {songElements}
        </ul>
    );
  }
}


class AddPlaylist extends React.Component {
  render() {
    return (
        <DefaultLayout title="Add New Playlist">
            <form className="add" method="POST" action= "/playlist">
                <h1>Add New Playlist</h1>
                <audio src="demo.mp3" controls></audio>
                Name: <input className="form-control" name="name"/><br/>
                Songs: <Songs songs={this.props.songs}/><br/>
                <input className="btn btn-primary" type="submit" value="Add new Playlist"/>
            </form>
        </DefaultLayout>
    );
  }
}

module.exports = AddPlaylist;