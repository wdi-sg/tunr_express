const React = require("react");
const DefaultLayout = require("./default");

class Show extends React.Component {
  render() {
    // Javascript here
    // this.props.artist here is an arr with 1 obj..
    const artist = this.props.artist[0]; // {}
    // console.log(`/artist/${artist.id}?_method=PUT`);
    const editLink = `/artist/${artist.id}/edit`;
    const deleteLink = `/artist/${artist.id}?_method=DELETE`;
    return (
      <DefaultLayout title={artist.name}>
        <img src={artist["photo_url"]} class="img-fluid" />
        <h1>{artist.name}</h1>
        <p>{artist.nationality}</p>
        <form action={editLink} method="GET">
            <button class="btn btn-primary">Edit Info</button>
        </form>
        <form action={deleteLink} method="POST">
            <button class="btn btn-danger">Delete</button>
        </form>
        <form action="/artist" method="GET">
            <button class="btn btn-secondary">Back</button>
          </form>
      </DefaultLayout>
    );
  }
}

module.exports = Show;