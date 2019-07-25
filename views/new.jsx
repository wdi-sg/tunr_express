var React = require("react");
const Layout = require('./layout.jsx');

class New extends React.Component {
  render() {
    //var artistId = parseInt(this.props.artistList[this.props.artistList.length - 1].id);
    return (
<Layout>
            <h1>Create a new artist!</h1>
            <form method="POST" action="/artists">
                {/*<p>Artist Id: <input type="number" name="id" value={artistId + 1} readOnly /></p>*/}
                <p>Artist Name: <input type="text" name="name"/></p>
                <p>Artist Nationality: <input type="text" name="nationality"/></p>
                <p>Image: <input type="text" name="photo_url"/></p>
                <p>--</p>
                <input type="submit" value="Submit" />
            </form>
</Layout>
    );
  }
}

module.exports = New;