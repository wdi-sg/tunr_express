var React = require("react");

export default class Artistnewsong extends React.Component {
  render() {
    let {id,title, album, preview_link, artwork, artist_id} = this.props;

        return (
<form method="POST" action={`/artists/${id}/songs`} >
    Title:  <input type="text" name="title" /> <br /> <br />
    Album: <input type="text" name="album" /> <br /> <br />
    Preview Link: <input type="text" name="preview_link" /> <br /> <br />
    Artwork:  <input type="text" name="artwork" /> <br /> <br />
    ID : <input type="text" name="artist_id" defaultValue={artist_id} readonly="readonly" /> <br /> <br />
    <input type="submit" value="Add" />
</form>
            );
  }
}

