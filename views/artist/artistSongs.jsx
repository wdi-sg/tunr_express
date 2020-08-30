var React = require("react");

class artistSongs extends React.Component {
  render() {
    let {id, name, photo_url, nationality} = this.props.result[0];
    let list = this.props.result.map((item)=>{
        let {title,album,preview_link,artwork} = item;
        return (
            <li>
            <p>{title}, {album}, {preview_link}, {artwork}</p>
            </li>
        )
    })
    return (
      <html>
        <head />
        <body>
          <h1>Show all</h1>
          <p>See a single artist songs</p>
          <p>{`${name}, ${photo_url}, ${nationality}`}</p>
          <ul>
          {list}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = artistSongs;