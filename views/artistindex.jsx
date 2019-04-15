var React = require("react");
var Layout = require("./layout");

class Artistindex extends React.Component {
  render() {

    const themArtists = this.props.artists.map((artist) => {
        return  (
            <tr>
                <td>{artist.id}</td>
                <td>{artist.name}</td>
                <td><img src={artist.photo_url} alt="artist image"/></td>
            </tr>
        );
    });

    return (
        <Layout>
          <h1>Available Artists:</h1>
            <table class="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Artists</th>
                        <th scope="col">Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {themArtists}
                </tbody>
            </table>
        </Layout>
    );
  }
}

module.exports = Artistindex;