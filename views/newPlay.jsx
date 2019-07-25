const React = require('react');
const DefaultLayout = require('./layouts/default');
const SelectBlock = require('./components/selectBlock2');


class New extends React.Component {
  render() {

    let headerTitle = "New Playlist | Tunr";

    let songs = this.props.songs;

    let playlistURL = `/playlists`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Create New Playlist</h1>

        <form method="POST" action={playlistURL}>
            <p>Name:</p>
            <input type={"text"} name={"name"} required/>
            <p>Songs:</p>
            <SelectBlock songs={songs}/>
            <SelectBlock songs={songs}/>
            <SelectBlock songs={songs}/>
            <br/>
            <br/>
            <input type="submit" value="CREATE SONG"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = New;