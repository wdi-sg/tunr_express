const React = require('react');

export default class Oneplaylist extends React.Component { //component is capitalized for first letter of name of file.
    render(){
        let {playlist} = this.props;

        let playlistSongs = playlist.map(item=>{
            return <tr >
                <td>{item.id}</td>
                <td>{item.playlist_name}</td>
                <td>{item.songs_title}</td>
                <td>{item.artist_name}</td>
                <td>{item.album}</td>
            </tr>
        })

        return (
            <html>
                <body>
                    <div>
                    <table style={{border: "1px solid black"}}>
                        <tr>
                            <th>ID</th>
                            <th>Playlist Name</th>
                            <th>Song Title</th>
                            <th>Artist</th>
                            <th style={{textAlign: "left"}}>Album</th>
                        </tr>
                            {playlistSongs}
                    </table>
                    </div>
                </body>
            </html>
            )
    }
}


