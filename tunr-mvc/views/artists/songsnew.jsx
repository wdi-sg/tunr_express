var React = require("react");

export default class Songsnew extends React.Component {
  render() {
        return (
<form method="POST" action="/songs" >
    Title:  <input type="text" name="title" /> <br /> <br />
    Album: <input type="text" name="album" /> <br /> <br />
    Preview Link:  <input type="text" name="preview_link" /> <br /> <br />
    Artwork:  <input type="text" name="artwork" /> <br /> <br />
    Artist Id:  <input type="text" name="artist_id" /> <br /> <br />
    <input type="submit" value="Submit" />
</form>
            );
  }
}

