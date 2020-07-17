const React = require("react");
const DefaultLayout = require('./layouts/default');
const SongsBlock = require('./components/songsBlock');


class Songs extends React.Component {
  render() {

    let headerTitle = 'Songs | Tunr'
    let songs = this.props.songs;
    let id = this.props.id;
    let createURL = `/artists/${id}/songs/new`
    let buttonStyle = {'fontSize': '25px'}

    return (

      <DefaultLayout title={headerTitle}>

        <h1>SONGS</h1>

        <form action={createURL}>
            <button style={buttonStyle} type={"submit"}>NEW SONG</button>
        </form>

        <SongsBlock songs={songs} id={id}/>



      </DefaultLayout>
    );

  }
}

module.exports = Songs;