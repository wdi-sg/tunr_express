var React = require("react");

class artistSongs extends React.Component {
  render() {

    // const artist = this.props.artist.map((artist)=>{
    //     return()
    // })

    const artistsongs = this.props.songs.map((songs)=> {
        return (
        <tr>
            <td>{songs.title}</td>
            <td>{songs.album}</td>
            <td>{songs.preview_link}</td>
            <td><img src={songs.artwork} width="100px"/></td>
        </tr>
        )
    });


    return (
      <html>
        <head />
        <body>

            <table>
                <tr>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Preview link</th>
                    <th>Artwork</th>
                    {artistsongs}
                </tr>
            </table>
        </body>
      </html>
    );
  }
}

module.exports = artistSongs;