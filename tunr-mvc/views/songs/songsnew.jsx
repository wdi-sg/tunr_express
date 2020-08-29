var React = require("react");

export default class Songsnew extends React.Component {
  render() {
    let {artists} = this.props;
    let artistList = artists.map(item=>{
        return <option value={`${item.id}`}>{item.name}</option>
    })
        return (
<form method="POST" action="/songs" >
Artist: <select name="artist_id" id="artist_id">
{artistList}
</select>
<br />
<br />
    New Song Details: <br /> <br />
    Title:  <input type="text" name="title" /> <br /> <br />
    Album: <input type="text" name="album" /> <br /> <br />
    Preview Link:  <input type="text" name="preview_link" /> <br /> <br />
    Artwork:  <input type="text" name="artwork" /> <br /> <br />
    <input type="submit" value="Submit" />
</form>
            );
  }
}

