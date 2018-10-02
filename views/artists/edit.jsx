var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;

    let putString = `/artists/${artist.id}?_method=PUT`;

    let deleteString  = `/artists/${artist.id}?_method=DELETE`;

    let title = "Edit " + artist.name;

    return (
    <Layout title={title}>
      <h1>Edit {artist.name}</h1>
      <form method="POST" action={putString}>
        <label>Name:</label>
        <input name="name" required autoComplete="off" defaultValue={artist.name}/>
        <label>Photo URL:</label>
        <input name="photo_url" required autoComplete="off" defaultValue={artist.photo_url}/>
        <label>Nationality:</label>
        <input name="nationality" required autoComplete="off" defaultValue={artist.nationality}/>
        <input type="submit" value="Edit"/><br/>
      </form>
      <form method="POST" action={deleteString}>
        <input type="submit" value="Delete"/><br/>
      </form>
    </Layout>
    )
  }
}

module.exports = Home;
