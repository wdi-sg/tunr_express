const React = require("react");
const DefaultLayout = require("./default");

class Home extends React.Component {
  render() {
    // Javascript here
    // this.props.artists [{},{}]
    // Because I deleted id 1 from artist data
    // I use index to render the 'id' column
    const artists = this.props.artists.map( (artist,index) => {
        // console.log(artist["photo_url"]);
        // if artist.boolean === valid
        return <tr>
                <th scope="row"><p>{index + 1}</p></th>
                <td><a href={`/artist/${artist.id}`}>{artist.name}</a></td>
                <td><img src={artist["photo_url"]} alt="IMAGE" width="150px" /></td>
                <td><p>{artist.nationality}</p></td>
               </tr>
    })
    return (
        <DefaultLayout title="Your Favourite Artists">
            <h1 class="text-center">Your Favourite Artist brought to you by TUNR</h1>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {artists}
              </tbody>
            </table>
        </DefaultLayout>
    );
  }
}

module.exports = Home;