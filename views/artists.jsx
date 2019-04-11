var React = require("react");

class Artists extends React.Component {
  render() {
    let data = this.props.artist;
    let songs = this.props.songs;
    let artist = data[0].name;
    let photoURL = data[0].photo_url;
    let nationality = data[0].nationality;
    let numberOfSongs = songs.length;
    let songIndex = [];
    for (let i = 1; i < numberOfSongs.length + 1; i++) {
      songsIndex.push(i);
    }
    let songsHTML = songs.map((song, index) => {
      let songIndex = index + 1;
      return (
        <tr key={songIndex}>
          <th scope="row">{songIndex}</th>
          <td>{song.title}</td>
          <td>{song.album}</td>
          <td>
            <audio controls>
              <source src={song.preview_link} type="audio/mp4" />
              Preview!
            </audio>
          </td>
          <td>
          <img className="album-art" src={song.artwork}/></td>
        </tr>
      );
    });
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <h1>{artist}</h1>
          <img src={photoURL} />
          <h2>{nationality}</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">title</th>
                <th scope="col">album</th>
                <th scope="col">Preview Link</th>
                <th scope="col">Artwork</th>
              </tr>
            </thead>
            <tbody>{songsHTML}</tbody>
          </table>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

module.exports = Artists;
