const React = require("react");
const DefaultLayout = require('./layouts/default');
const PlaylistBlock = require('./components/playlistBlock');


class Playlists extends React.Component {
  render() {

    let headerTitle = 'Playlists | Tunr'
    let playlists = this.props.playlists;
    let createURL = `/playlists/new`
    let buttonStyle = {'fontSize': '25px'}

    return (

      <DefaultLayout title={headerTitle}>

        <h1>All Playlists</h1>

        <form action={createURL}>
            <button style={buttonStyle} type={"submit"}>CREATE PLAYLIST</button>
        </form>

        <PlaylistBlock playlists={playlists}/>

      </DefaultLayout>
    );

  }
}

module.exports = Playlists;