var React = require('react');
class Playlistsongsadd extends React.Component {
  render() {
    let actionLink = "/playlist/" + String(this.props.id);
    let allSongsDropDownList = this.props.songs.map(song => {
        return <option value={song.id}>{song.title}</option>
    });
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Add song into playlist</h1>
          </div>
          <div>
            <div>
              <form method="POST" action={actionLink}>
                <div>
                <select id="songs" name="songs">
                  {allSongsDropDownList}
                </select>
                </div>
                <div>
                  <input type="submit" value="submit"></input>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlistsongsadd;