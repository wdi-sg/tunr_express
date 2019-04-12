const React = require("react");
const DefaultLayout = require("./default");

class Home extends React.Component {
  render() {
    // Javascript here
    // this.props.artists [{},{}]
    const songs = this.props.songs.map(song => {
        // console.log(artist["photo_url"]);
        return <tr>
                <th scope="row"><p>{song.id}</p></th>
                <td><p>{song.title}</p></td>
                <td><p>{song.album}</p></td>
                <td><a href="#">{song["preview_link"]}</a></td>
                <td><img src={song.artwork} alt="IMAGE" width="150px" /></td>
               </tr>
    })
    return (
        <DefaultLayout title="Your Favourite Artists">
            <h1 class="text-center">Your Favourite Songs  by your Favourite Artist</h1>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Album</th>
                  <th scope="col">Preview Link</th>
                  <th scope="col">Artwork</th>
                </tr>
              </thead>
              <tbody>
                {songs}
              </tbody>
            </table>
        </DefaultLayout>
    );
  }
}

module.exports = Home;