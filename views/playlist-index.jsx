const React = require("react");
const DefaultLayout = require("./default");

class Home extends React.Component {
  render() {
    // Javascript here
    // this.props.playlists [{},{}]
    const playlists = this.props.playlists.map( playlist => {
        return <div>
                <a href="#">{playlist.title}</a>
               </div>
    })
    return (
        <DefaultLayout title="ALL Your Favourite Playlists">
            <h1 class="text-center">A Collection of your Favourite Playlists</h1>
            {playlists}
        </DefaultLayout>
    );
  }
}

module.exports = Home;