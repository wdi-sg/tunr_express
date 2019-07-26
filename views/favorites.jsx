const React = require('react');
const DefaultLayout = require('./layouts/default');
const SongsBlock = require('./components/songsBlock');

class Favorites extends React.Component {
  render() {

    let headerTitle = "Favorites | Tunr";

    let songs = this.props.songs;
    // let artists = this.props.artists;
    // let id = this.props.id;

    let favNewURL = `/favorites/new`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Choose Favorite Songs</h1>

        <form action={favNewURL}>
            <button>CHOOSE FAVORITE SONGS</button>
        </form>

        <br/>
        <br/>

        <h3>All songs</h3>

        <SongsBlock songs={songs}/>


      </DefaultLayout>
    );
  }
}

module.exports = Favorites;