var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;

    let actionString = `/artists/${artist.id}?_method=PUT`;

    return (
    <Layout title="Edit Artist">
      <h1>{artist.name}</h1>
      <form method="POST" action={actionString}>
        <label>Name:</label>
        <input name="name" required autoComplete="off" defaultValue={artist.name}/>
        <label>Photo URL:</label>
        <input name="photo_url" required autoComplete="off" defaultValue={artist.photo_url}/>
        <label>Nationality:</label>
        <input name="nationality" required autoComplete="off" defaultValue={artist.nationality}/>
        <input type="submit" value="Submit"/><br/>
      </form>
    </Layout>
    )
  }
}

module.exports = Home;
