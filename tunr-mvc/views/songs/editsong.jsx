var React = require("react");

export default class Editsong extends React.Component {
  render() {
    let {id,title, album, preview_link, artwork, artist_id} = this.props;

        return (
<form method="POST" action={`/songs/${id}?_method=put`} >
    New Title:  <input type="text" name="title" defaultValue={title}/> <br /> <br />
    New Album: <input type="text" name="album" defaultValue={album}/> <br /> <br />
    New PReview Link: <input type="text" name="preview_link" defaultValue={preview_link}/> <br /> <br />
    New Artwork:  <input type="text" name="artwork" defaultValue={artwork}/> <br /> <br />
    <input type="submit" value="Update" />
</form>
            );
  }
}

