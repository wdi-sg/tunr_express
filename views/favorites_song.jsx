const React = require('react');
const DefaultLayout = require('./layouts/default');
const SongsBlock = require('./components/songsBlock');

class Favorites extends React.Component {
  render() {

    let headerTitle = "Favorites | Tunr";

    let songs = this.props.songs;
    // let artists = this.props.artists;
    let id = this.props.id;

    let songsURL = `/artists/${this.props.id}/songs`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Confirm Favorite?</h1>

        <form method="POST" action={songsURL}>
            <button>CONFIRM</button>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = Favorites;