var React = require("react");
const Layout = require('./layout.jsx');

class Newsong extends React.Component {
  render() {

    let artistList = this.props.artists.map(artist=>{
        return <option value={artist.id}>{artist.name}</option>
    })

    return (
<Layout>
            <h1>Input a new song!</h1>
            <form method="POST" action="/artists/:id/songs">
                {/*<p>Artist Id: <input type="number" name="id" value={artistId + 1} readOnly /></p>*/}
                <p>Title: <input type="text" name="title"/></p>
                <p>Album: <input type="text" name="album"/></p>
                <p>Song preview: <input type="text" name="preview_link"/></p>
                <p>Artwork: <input type="text" name="artwork"/></p>
                <p>Artist: <select name="artist">
                            {artistList}
                        </select></p>
                <input type="text" name="artist_id" value={this.props.artistId} hidden/>
                <p>--</p>
                <input type="submit" value="Submit" />
            </form>
</Layout>
    );
  }
}

module.exports = Newsong;