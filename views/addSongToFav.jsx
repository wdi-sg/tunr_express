var React = require('react');

class addSongToFav extends React.Component {
    render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
        let Capitalize = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1)
        };
        let songsArray = this.props.selectedPlaylist;
        const list = songsArray.map(song => {
        return <option name="song" value={song.id}>{song.title}</option>
    });
    return (
      <html>
        <body>
        <h1>Add a song to your favorites from here!</h1>
          <div>
          <form method="POST" action="/favorites">
            <select name="song_id">
            {list}
            </select>
            <p>
                <input type="submit" value="submit"/>
            </p>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = addSongToFav;