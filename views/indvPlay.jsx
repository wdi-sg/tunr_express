const React = require("react");
const DefaultLayout = require('./layouts/default');


class Artist extends React.Component {
  render() {

    console.log(this.props);
    let playlist = this.props.playlist[0];
    let songs = this.props.songs;
    let id = this.props.id;
    let imgStyle = {width: '300px', height: '300px'}
    let buttonStyle = {'fontSize': '25px'}
    let deleteURL = `/playlists/${id}?_method=DELETE`;


    let headerTitle = `${playlist.name} | Tunr`;

    let songsArr = songs.map(song => {
        return <p>{song.title}</p>
    })

    return (

      <DefaultLayout title={headerTitle}>

        <h1>{playlist.name}</h1>

        <div>
            {songsArr}
        </div>

        <form method="POST" action={deleteURL}>
            <button style={buttonStyle} type={"submit"}>DELETE PLAYLIST</button>
        </form>

      </DefaultLayout>
    );

  }
}

module.exports = Artist;